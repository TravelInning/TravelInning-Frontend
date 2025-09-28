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
import { loadMessages, createOneChat } from "../api/chat/chat";

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

const JOIN_SEND_DELAY_MS = 120;

export const useChatRoom = ({ initialRoomId, postId, baseURL }) => {
  const listRef = useRef(null);
  const atBottomRef = useRef(true);

  // ids / meta
  const [userId, setUserId] = useState(null);
  const [roomId, setRoomId] = useState(initialRoomId ?? null);
  const [authorView, setAuthorView] = useState(false);

  // messages / loading
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [nextCursor, setNextCursor] = useState(undefined);

  // me
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

  // socket
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
      setMessages((prev) => dedupById([...prev, ui]));
    };

    // 리스너 중복 방지
    s.off("connect", onConnect);
    s.on("connect", onConnect);
    s.removeAllListeners?.("receiveMessage");
    s.on("receiveMessage", onReceive);

    if (roomId && s.connected) joinRoomDual(roomId, userId);

    return () => {
      s.off("connect", onConnect);
      s.off("receiveMessage", onReceive);
    };
  }, [userId, roomId, baseURL]);

  // 초기 메시지
  useEffect(() => {
    (async () => {
      if (!roomId || !userId) return;
      setLoading(true);
      try {
        const page = await loadMessages({ roomId, size: 20, dir: "next" });

        if (typeof page?.authorView === "boolean") {
          setAuthorView(page.authorView);
        }

        const ui = (page?.messages ?? [])
          .map((m) => mapIncoming(m, userId))
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setMessages(dedupById(ui));
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
        if (!s || !s.connected) return false;

        await joinRoomDual(ensured, userId);
        await new Promise((r) => setTimeout(r, JOIN_SEND_DELAY_MS));

        const saved = await sendMessageDual(ensured, userId, content);
        if (saved) {
          const ui = mapIncoming(saved, userId);
          setMessages((prev) => dedupById([...prev, ui]));
          return true;
        }

        // ack 실패 → 로컬 에코
        const localEcho = mapIncoming(
          {
            id: `echo-${Date.now()}`,
            senderId: userId,
            message: content,
            createdAt: new Date().toISOString(),
          },
          userId
        );
        setMessages((prev) => dedupById([...prev, localEcho]));
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

      if (typeof page?.authorView === "boolean") {
        setAuthorView(page.authorView);
      }

      const older = (page?.messages ?? [])
        .map((m) => mapIncoming(m, userId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMessages((prev) => dedupById([...older, ...prev]));
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

  const lastServerMessageId = useMemo(() => {
    let maxId = 0;
    for (const m of messages) {
      const n =
        typeof m.id === "number" ? m.id : Number.isFinite(+m.id) ? +m.id : NaN;
      if (Number.isFinite(n)) maxId = Math.max(maxId, n);
    }
    return maxId || null;
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
      const { contentOffset } = e.nativeEvent;
      if (contentOffset.y <= 40) loadOlder();
      const { contentSize, layoutMeasurement } = e.nativeEvent;
      const pad = 40;
      const stayBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - pad;
      atBottomRef.current = stayBottom;
    },
    [loadOlder]
  );

  return {
    listRef,
    userId,
    roomId,
    setRoomId,
    authorView,
    messages: messagesComputed,
    loading,
    loadingOlder,
    onSend,
    handleScroll,
    setRoomId,
    lastServerMessageId,
  };
};
