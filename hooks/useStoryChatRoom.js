// hooks/useStoryChatRoom.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { hhmm, sameMinute } from "../utils/time";
import {
  initSocket,
  getSocket,
  disconnectSocket,
  joinRoomDual,
  sendMessageDual,
} from "../socket/chatSocket";
import {
  enterStoryRoom,
  leaveStoryRoom,
  fetchStoryMessages,
  fetchRemainingSeconds,
  fetchParticipantsCount,
} from "../api/storyroom/chat";

const dedup = (arr) => {
  const seen = new Set();
  const out = [];
  for (const m of arr) {
    const key =
      (m.id && String(m.id)) || `${m.createdAt}|${m.senderId}|${m.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(m);
  }
  return out;
};

// 서버 → UI 표준화
const mapIncoming = (raw, myId) => ({
  id: raw.id || `tmp-${Date.now()}`,
  senderId: raw.senderId,
  senderName:
    Number(raw.senderId) === Number(myId) ? "me" : raw.senderName || "참가자",
  side: Number(raw.senderId) === Number(myId) ? "right" : "left",
  text: raw.message ?? raw.content ?? "",
  time: hhmm(raw.createdAt),
  createdAt: raw.createdAt || new Date().toISOString(),
  fromBlockedUser: raw.fromBlockedUser,
  role: raw.senderRole,
});

export const useStoryChatRoom = ({ roomId: initialRoomId, baseURL }) => {
  const listRef = useRef(null);
  const atBottomRef = useRef(true);

  const [roomId, setRoomId] = useState(initialRoomId ?? null);
  const [userId, setUserId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cursor, setCursor] = useState(undefined); // nextCursor를 커서로 사용
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);

  const [remainSec, setRemainSec] = useState(null);
  const [participants, setParticipants] = useState(0);

  const [inputDisabled, setInputDisabled] = useState(false);

  const [expired, setExpired] = useState(false);
  const expiredRef = useRef(false);

  // me
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      (async () => {
        const raw = await AsyncStorage.getItem("userId");
        const me = raw != null ? Number(raw) : null;
        if (alive) setUserId(Number.isFinite(me) ? me : null);
      })();
      return () => {
        alive = false;
      };
    }, [])
  );

  // 입장/퇴장 life-cycle
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        if (!roomId || !userId) return;
        await enterStoryRoom(roomId, userId).catch(() => {});
        initSocket(baseURL);
        const s = getSocket();

        const onConnect = () => joinRoomDual(roomId, userId);
        const onReceive = (raw) => {
          const ui = mapIncoming(raw, userId);
          setMessages((prev) => dedup([...prev, ui]));
        };

        s.on("connect", onConnect);
        s.on("receiveMessage", onReceive);

        if (s.connected) joinRoomDual(roomId, userId);

        // 초기 메시지
        setLoading(true);
        try {
          const page = await fetchStoryMessages({
            roomId,
            meId: userId,
            size: 20,
            direction: "prev",
          });
          const ui = (page?.messages ?? [])
            .map((m) => mapIncoming(m, userId))
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setMessages(dedup(ui));
          setCursor(page?.nextCursor); // 서버 스펙: nextCursor를 다음 페이지용으로 사용
          setHasMoreOlder(!!page?.nextCursor);
        } finally {
          setLoading(false);
        }

        // 폴링: 남은 시간
        const remainInt = setInterval(async () => {
          try {
            const sec = await fetchRemainingSeconds(roomId);
            if (!mounted) return;

            setRemainSec(sec);
            const isOver = !(typeof sec === "number" && sec > 0);
            setInputDisabled(isOver);

            // ★ 최초 만료 감지 시 처리
            if (isOver && !expiredRef.current) {
              expiredRef.current = true;
              setExpired(true);
              // 퇴장 REST (실패해도 무시)
              leaveStoryRoom(roomId, userId).catch(() => {});
              // 소켓 정리(선택)
              disconnectSocket();
            }
          } catch {}
        }, 3000);

        // 폴링: 인원수
        const partInt = setInterval(async () => {
          try {
            const cnt = await fetchParticipantsCount(roomId);
            if (!mounted) return;
            setParticipants(Number.isFinite(cnt) ? cnt : 0);
          } catch {}
        }, 10000);

        return () => {
          mounted = false;
          s.off("connect", onConnect);
          s.off("receiveMessage", onReceive);
          clearInterval(remainInt);
          clearInterval(partInt);
          // 퇴장
          leaveStoryRoom(roomId, userId).catch(() => {});
        };
      })();
    }, [roomId, userId, baseURL])
  );

  // 더 불러오기(위로 스크롤)
  const loadOlder = useCallback(async () => {
    if (!roomId || !userId || !hasMoreOlder || loadingOlder) return;
    try {
      setLoadingOlder(true);
      const page = await fetchStoryMessages({
        roomId,
        meId: userId,
        size: 20,
        cursor, // 이전 요청의 nextCursor
        direction: "next", // 서버 스펙에 맞춰 조정(데이터 형태에 맞게 prev/next 써보며 확인)
      });
      const older = (page?.messages ?? [])
        .map((m) => mapIncoming(m, userId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMessages((prev) => dedup([...older, ...prev]));
      setCursor(page?.nextCursor);
      setHasMoreOlder(!!page?.nextCursor);
    } finally {
      setLoadingOlder(false);
    }
  }, [roomId, userId, cursor, hasMoreOlder, loadingOlder]);

  // 보내기
  const onSend = useCallback(
    async (text) => {
      const content = (text || "").trim();
      if (!content || !userId || !roomId || inputDisabled) return false;
      const s = getSocket();
      if (!s || !s.connected) return false;

      await joinRoomDual(roomId, userId); // 안전
      const ok = await sendMessageDual(roomId, userId, content);
      if (!ok) return false;

      const echo = mapIncoming(
        {
          id: `echo-${Date.now()}`,
          senderId: userId,
          message: content,
          createdAt: new Date().toISOString(),
        },
        userId
      );
      setMessages((prev) => dedup([...prev, echo]));
      return true;
    },
    [roomId, userId, inputDisabled]
  );

  // UI 그룹핑(시간/말풍선 붙이기)
  const computed = useMemo(() => {
    const arr = messages;
    return arr.map((m, i) => {
      const prev = arr[i - 1];
      const next = arr[i + 1];
      const showPeerHeader =
        m.side === "left" &&
        !(prev && prev.side === "left" && sameMinute(prev.time, m.time));
      const marginBottom = next && next.side !== m.side ? 40 : 10;
      const isGroupEnd = !(
        next &&
        next.side === m.side &&
        sameMinute(next.time, m.time)
      );
      return { ...m, showPeerHeader, marginBottom, isGroupEnd };
    });
  }, [messages]);

  // 키보드 올라오면 끝으로
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      listRef.current?.scrollToEnd?.({ animated: true });
    });
    return () => show.remove();
  }, []);

  // 새 메시지 들어오면 자동 스크롤
  useEffect(() => {
    if (atBottomRef.current) listRef.current?.scrollToEnd?.({ animated: true });
  }, [messages.length]);

  const handleScroll = useCallback(
    (e) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const pad = 40;
      const stayBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - pad;
      atBottomRef.current = stayBottom;
      if (contentOffset.y <= 40) loadOlder();
    },
    [loadOlder]
  );

  return {
    listRef,
    roomId,
    setRoomId,
    userId,
    messages: computed,
    loading,
    loadingOlder,
    onSend,
    handleScroll,
    remainSec,
    participants,
    inputDisabled,
    expired,
  };
};
