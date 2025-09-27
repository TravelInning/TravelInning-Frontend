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
} from "../api/storyroom/chat";

// 서버 id로만 dedup (echo-id와 서버 id 섞여 들어와도 서버 id 우선)
const dedupById = (arr) => {
  const seen = new Set();
  const out = [];
  for (const m of arr) {
    const key = String(m.id);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(m);
  }
  return out;
};

// 서버 → UI 표준화
const mapIncoming = (raw, myId) => {
  const isMe = Number(raw.senderId) === Number(myId);
  return {
    id: raw.id || `tmp-${Date.now()}-${Math.random()}`,
    senderId: raw.senderId,
    senderName: raw.senderName || (isMe ? "나" : `user#${raw.senderId}`),
    avatarUrl: raw.senderProfileUrl || null,
    side: isMe ? "right" : "left",
    text: raw.message ?? raw.content ?? "",
    time: hhmm(raw.createdAt || new Date().toISOString()),
    createdAt: raw.createdAt || new Date().toISOString(),
    fromBlockedUser: raw.fromBlockedUser,
    role: raw.senderRole,
  };
};

// “최초 1회 입장 알림” 캐시 키
const JOIN_ONCE_KEY = (roomId, userId) => `sr_join_once_${roomId}_${userId}`;

export const useStoryChatRoom = ({ roomId: initialRoomId, baseURL }) => {
  const listRef = useRef(null);
  const atBottomRef = useRef(true);

  const [roomId, setRoomId] = useState(initialRoomId ?? null);
  const [userId, setUserId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cursor, setCursor] = useState(undefined); // 서버 nextCursor 사용
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);

  const [remainSec, setRemainSec] = useState(null);

  const [inputDisabled, setInputDisabled] = useState(false);

  const [expired, setExpired] = useState(false);
  const expiredRef = useRef(false);

  // 내 닉네임(입장 메시지용)
  const [myName, setMyName] = useState(null);

  // 같은 포커스 주기에서 enter 중복 호출 방지
  const enteredRef = useRef(false);

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

  // 내 닉네임 로드
  useEffect(() => {
    (async () => {
      const n = await AsyncStorage.getItem("userName");
      setMyName(n || "참가자");
    })();
  }, []);

  // “예전에 들어온 적이 있는지” 판단
  const detectHasEverEntered = useCallback(
    async (loadedUi) => {
      // 캐시 먼저 확인
      const cached = await AsyncStorage.getItem(JOIN_ONCE_KEY(roomId, userId));
      if (cached === "1") return true;

      // 히스토리상 내가 보낸 메시지 혹은 내 입장 시스템 문구가 있으면 true
      const iSentBefore = loadedUi?.some(
        (m) => Number(m.senderId) === Number(userId)
      );

      const myJoinText = `[SYSTEM] ${myName || "참가자"}님이 입장했습니다.`;
      const iSentJoinBefore = loadedUi?.some(
        (m) => typeof m.text === "string" && m.text === myJoinText
      );

      return Boolean(iSentBefore || iSentJoinBefore);
    },
    [roomId, userId, myName]
  );

  // 최초 1회 입장 알림 보내기
  const announceJoinOnce = useCallback(async () => {
    try {
      const s = getSocket();
      if (!s || !s.connected) return;

      await joinRoomDual(roomId, userId); // 안전 조인
      const msg = `[SYSTEM] ${myName || "참가자"}님이 입장했습니다.`;

      const saved = await sendMessageDual(roomId, userId, msg);
      if (saved) {
        const ui = mapIncoming(saved, userId);
        setMessages((prev) => dedupById([...prev, ui]));
      } else {
        // ack 실패 시 로컬 에코(서버가 다시 브로드캐스트하면 dedupById가 처리)
        const echo = mapIncoming(
          {
            id: `echo-${Date.now()}`,
            senderId: userId,
            message: msg,
            createdAt: new Date().toISOString(),
          },
          userId
        );
        setMessages((prev) => dedupById([...prev, echo]));
      }
      await AsyncStorage.setItem(JOIN_ONCE_KEY(roomId, userId), "1");
    } catch {
      // 조용히 실패 무시
    }
  }, [roomId, userId, myName]);

  // 입장/퇴장 + 소켓 수신/초기 로드 + 남은시간(로컬 타이머)
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      let tickTimer = null;
      let deadlineMs = null;

      (async () => {
        if (!roomId || !userId) return;

        // enter: 같은 포커스 사이클에서 중복 방지
        if (!enteredRef.current) {
          enteredRef.current = true;
          await enterStoryRoom(roomId, userId).catch(() => {});
        }

        // 소켓 초기화/조인
        initSocket(baseURL);
        const s = getSocket();

        const onConnect = () => joinRoomDual(roomId, userId);
        const onReceive = (raw) => {
          const ui = mapIncoming(raw, userId);
          setMessages((prev) => dedupById([...prev, ui]));
        };

        s.off("connect", onConnect);
        s.on("connect", onConnect);
        s.removeAllListeners?.("receiveMessage");
        s.on("receiveMessage", onReceive);

        if (s.connected) joinRoomDual(roomId, userId);

        // 초기 메시지 로드
        setLoading(true);
        let initialUi = [];
        try {
          const page = await fetchStoryMessages({
            roomId,
            meId: userId,
            size: 20,
            direction: "prev",
          });
          initialUi = (page?.messages ?? [])
            .map((m) => mapIncoming(m, userId))
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setMessages(dedupById(initialUi));
          setCursor(page?.nextCursor);
          setHasMoreOlder(!!page?.nextCursor);
        } finally {
          setLoading(false);
        }

        // ★ 최초 진입이면 시스템 입장 알림 1회 전송
        const hasEver = await detectHasEverEntered(initialUi);
        if (!hasEver) {
          await announceJoinOnce();
        }

        // --- 남은 시간: 최초 1회만 서버에서 초 단위로 받아와서 로컬 타이머로 감소 ---
        try {
          const sec = await fetchRemainingSeconds(roomId);
          if (!mounted) return;

          if (typeof sec === "number" && sec > 0) {
            deadlineMs = Date.now() + sec * 1000;
          } else {
            deadlineMs = Date.now(); // 이미 만료
          }

          // 1초마다 로컬 타이머
          tickTimer = setInterval(() => {
            if (!deadlineMs) return;
            const left = Math.ceil((deadlineMs - Date.now()) / 1000);
            const next = Math.max(0, left);
            setRemainSec(next);
            setInputDisabled(next <= 0);

            if (next <= 0 && !expiredRef.current) {
              expiredRef.current = true;
              setExpired(true);
              leaveStoryRoom(roomId, userId).catch(() => {});
              disconnectSocket();
              clearInterval(tickTimer);
              // if (resyncTimer) clearInterval(resyncTimer);
            }
          }, 1000);
        } catch {}
      })();

      return () => {
        mounted = false;
        const s = getSocket();
        s?.off?.("connect");
        s?.off?.("receiveMessage");
        if (tickTimer) clearInterval(tickTimer);

        if (roomId && userId) {
          leaveStoryRoom(roomId, userId).catch(() => {});
        }
        enteredRef.current = false;
      };
    }, [roomId, userId, baseURL, detectHasEverEntered, announceJoinOnce])
  );

  // 과거 더 불러오기(위 스크롤)
  const loadOlder = useCallback(async () => {
    if (!roomId || !userId || !hasMoreOlder || loadingOlder) return;
    try {
      setLoadingOlder(true);
      const page = await fetchStoryMessages({
        roomId,
        meId: userId,
        size: 20,
        cursor, // 이전 요청에서 받은 nextCursor
        direction: "next",
      });
      const older = (page?.messages ?? [])
        .map((m) => mapIncoming(m, userId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMessages((prev) => dedupById([...older, ...prev]));
      setCursor(page?.nextCursor);
      setHasMoreOlder(!!page?.nextCursor);
    } finally {
      setLoadingOlder(false);
    }
  }, [roomId, userId, cursor, hasMoreOlder, loadingOlder]);

  // 보내기 (ack 우선, 실패 시 로컬 에코)
  const onSend = useCallback(
    async (text) => {
      const content = (text || "").trim();
      if (!content || !userId || !roomId || inputDisabled) return false;

      const s = getSocket();
      if (!s || !s.connected) return false;

      await joinRoomDual(roomId, userId);

      const saved = await sendMessageDual(roomId, userId, content);
      if (saved) {
        const ui = mapIncoming(saved, userId);
        setMessages((prev) => dedupById([...prev, ui]));
        return true;
      }

      // ack 실패 → 로컬 에코 (서버 브로드캐스트 들어오면 dedupById가 정리)
      const echo = mapIncoming(
        {
          id: `echo-${Date.now()}`,
          senderId: userId,
          message: content,
          createdAt: new Date().toISOString(),
        },
        userId
      );
      setMessages((prev) => dedupById([...prev, echo]));
      return true;
    },
    [roomId, userId, inputDisabled]
  );

  // UI 그룹핑(같은 사람일 때만 묶기)
  const messagesComputed = useMemo(() => {
    const arr = messages;
    return arr.map((m, i) => {
      const prev = arr[i - 1];
      const next = arr[i + 1];

      const sameSenderWithPrev =
        prev &&
        prev.side === m.side &&
        prev.senderId === m.senderId &&
        sameMinute(prev.time, m.time);

      const sameSenderWithNext =
        next &&
        next.side === m.side &&
        next.senderId === m.senderId &&
        sameMinute(next.time, m.time);

      const showPeerHeader = m.side === "left" && !sameSenderWithPrev;
      const isGroupEnd = !sameSenderWithNext;
      const marginBottom = isGroupEnd ? 40 : 10;

      return { ...m, showPeerHeader, isGroupEnd, marginBottom };
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
    messages: messagesComputed,
    loading,
    loadingOlder,
    onSend,
    handleScroll,
    remainSec,
    // participants,
    inputDisabled,
    expired,
  };
};
