import io from "socket.io-client";
import { normalizeRoomId } from "../utils/normalizeRoomId";

let socket = null;
let pendingQueue = [];
const joinedRooms = new Set();

export const initSocket = (baseURL) => {
  if (socket) return socket;
  socket = io(baseURL, {
    path: "/socket.io",
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    joinedRooms.clear();
    if (pendingQueue.length) {
      pendingQueue.forEach(({ event, payload, ack }) =>
        socket.emit(event, payload, ack)
      );
      pendingQueue = [];
    }
  });

  socket.on("connect_error", (err) => {
    console.log(
      "[socket] connect_error:",
      err?.message,
      err?.description,
      err?.context
    );
  });

  socket.on("error", (error) => console.log("[socket] error:", error));
  socket.on("disconnect", (reason) =>
    console.log("[socket] disconnect:", reason)
  );

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  try {
    socket?.disconnect();
  } finally {
    socket = null;
    joinedRooms.clear();
    pendingQueue = [];
  }
};

const toUuid = (id) => normalizeRoomId(id);

const rawJoin = (roomId, userId) =>
  new Promise((resolve) => {
    if (!socket || !socket.connected) return resolve(false);
    const payload = { roomId, userId };
    const key = `${roomId}:${userId}`;
    if (joinedRooms.has(key)) return resolve(true);

    const ack = () => {};

    socket.emit("joinRoom", payload, ack);
    joinedRooms.add(key);
    resolve(true);
  });

export const joinRoomDual = async (displayRoomId, userId) => {
  if (!socket) return false;
  const uuid = toUuid(displayRoomId);
  return rawJoin(uuid, userId);
};

const rawSend = (roomId, senderId, message) =>
  new Promise((resolve) => {
    if (!socket || !socket.connected) return resolve(false);
    const payload = { roomId, senderId, message };
    console.log("[sendMessage] payload =", payload);

    let settled = false;
    const t = setTimeout(() => {
      if (!settled) {
        settled = true;
        console.log("[sendMessage] ack TIMEOUT (no ack within 5s)");
        resolve(null);
      }
    }, 5000);

    socket.emit("sendMessage", payload, (serverMsg) => {
      if (!settled) {
        settled = true;
        clearTimeout(t);
        console.log("[sendMessage] ack serverMsg =", JSON.stringify(serverMsg));
        resolve(serverMsg || null);
      }
    });
  });

export const sendMessageDual = async (displayRoomId, userId, message) => {
  if (!socket || !socket.connected) return false;
  const uuid = toUuid(displayRoomId);
  return rawSend(uuid, userId, message);
};
