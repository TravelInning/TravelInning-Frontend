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
import { loadMessages, createOneChat, loadRoomSummary } from "../api/chat/chat";
import { loadProfile } from "../api/mypage/profile/profile";

const dedupMessages = (arr) => {
  const seen = new Set();
  const out = [];
  for (const m of arr) {
    const key =
      (m.id && String(m.id)) ||
      `${m.createdAt ?? ""}|${m.senderId ?? ""}|${m.text ?? ""}`;
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
    Number(raw.senderId) === Number(myId) ? "me" : raw.senderName || "상대",
  side: Number(raw.senderId) === Number(myId) ? "right" : "left",
  text: raw.message ?? raw.content ?? "",
  time: hhmm(raw.createdAt),
  createdAt: raw.createdAt || new Date().toISOString(),
  fromBlockedUser: raw.fromBlockedUser,
});

const JOIN_SEND_DELAY_MS = 150;

export const useChatRoom = ({ initialRoomId, postId, baseURL }) => {
  const listRef = useRef(null);
  const atBottomRef = useRef(true);

  // ids / meta
  const [userId, setUserId] = useState(null);
  const [roomId, setRoomId] = useState(initialRoomId ?? null);
  const [isGroup, setIsGroup] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // messages / loading
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [nextCursor, setNextCursor] = useState(undefined);

  // userId
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      (async () => {
        const raw = await AsyncStorage.getItem("userId");
        const nextId = raw != null ? Number(raw) : null;
        if (alive) setUserId(Number.isFinite(nextId) ? nextId : null);
      })();
      return () => {
        alive = false;
      };
    }, [])
  );

  // socket 조인
  useEffect(() => {
    if (!userId) {
      disconnectSocket();
      return;
    }

    initSocket(baseURL);
    const s = getSocket();

    const onConnect = () => {
      if (roomId) joinRoomDual(roomId, userId);
    };

    const onReceive = (rawMsg) => {
      const ui = mapIncoming(rawMsg, userId);
      setMessages((prev) => dedupMessages([...prev, ui]));
    };

    s.on("connect", onConnect);
    s.on("receiveMessage", onReceive);

    if (roomId && s.connected) joinRoomDual(roomId, userId);

    return () => {
      s.off("connect", onConnect);
      s.off("receiveMessage", onReceive);
    };
  }, [userId, roomId, baseURL]);

  // isOwner, isGroup
  useEffect(() => {
    (async () => {
      if (!roomId) return;
      const sum = await loadRoomSummary(roomId);
      setIsOwner(!!sum?.authorView);
      setIsGroup(!!sum?.group);
    })();
  }, [roomId]);

  // messages 로드
  useEffect(() => {
    (async () => {
      if (!roomId || !userId) return;
      setLoading(true);
      try {
        const page = await loadMessages({ roomId, size: 20, dir: "next" });
        const ui = (page?.messages ?? [])
          .map((m) => mapIncoming(m, userId))
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMessages(dedupMessages(ui));
        setNextCursor(page?.nextCursor);
        setHasMoreOlder(!!page?.nextCursor);
      } catch (error) {
        console.log("[chat] loadMessages error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [roomId, userId]);

  // 방 없으면 생성
  const ensureRoom = useCallback(async () => {
    if (roomId) return roomId;
    const created = await createOneChat(postId);
    if (!created?.roomId) throw new Error("createOneChat failed");
    setRoomId(created.roomId);
    return created.roomId;
  }, [roomId, postId]);

  // 메시지 보내기
  const onSend = useCallback(
    async (text) => {
      const content = (text || "").trim();
      if (!content || !userId) return false;
      try {
        const ensured = await ensureRoom();

        const s = getSocket();
        if (!s || !s.connected) {
          return false;
        }

        await joinRoomDual(ensured, userId);
        await new Promise((r) => setTimeout(r, JOIN_SEND_DELAY_MS));

        const ok = await sendMessageDual(ensured, userId, content);
        if (!ok) return false;

        // 로컬 echo
        const localEcho = mapIncoming(
          {
            id: `echo-${Date.now()}`,
            senderId: userId,
            message: content,
            createdAt: new Date().toISOString(),
          },
          userId
        );
        setMessages((prev) => dedupMessages([...prev, localEcho]));

        return true;
      } catch (error) {
        console.log("[chat] onSend error:", error);
        return false;
      }
    },
    [userId, ensureRoom]
  );

  // 과거 로드
  const loadOlder = useCallback(async () => {
    if (!roomId || !hasMoreOlder || loadingOlder) return;
    try {
      setLoadingOlder(true);
      const page = await loadMessages({
        roomId,
        size: 20,
        dir: "next",
        cursor: nextCursor,
      });
      const older = (page?.messages ?? [])
        .map((m) => mapIncoming(m, userId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMessages((prev) => dedupMessages([...older, ...prev]));
      setNextCursor(page?.nextCursor);
      setHasMoreOlder(!!page?.nextCursor);
    } finally {
      setLoadingOlder(false);
    }
  }, [roomId, hasMoreOlder, loadingOlder, nextCursor, userId]);

  // UI 그룹핑
  const messagesComputed = useMemo(() => {
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

  // 스크롤
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      listRef.current?.scrollToEnd?.({ animated: true });
    });
    return () => show.remove();
  }, []);

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
    userId,
    roomId,
    setRoomId,
    isGroup,
    isOwner,
    messages: messagesComputed,
    loading,
    loadingOlder,
    onSend,
    handleScroll,
  };
};
