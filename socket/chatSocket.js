import io from "socket.io-client";

let socket = null;
let pendingQueue = [];
const joinedRooms = new Set();

export const initSocket = (baseURL) => {
  if (socket) return socket;
  socket = io(baseURL, {
    transports: ["websocket"],
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

  socket.on("connect_error", (error) =>
    console.log("[socket] connect_error:", error)
  );
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

const toUuid = (id) => {
  const m = String(id).match(/^CR-([0-9a-fA-F-]{36})$/);
  return m ? m[1] : id;
};

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
    const ack = () => {};
    socket.emit("sendMessage", payload, ack);
    resolve(true);
  });

export const sendMessageDual = async (displayRoomId, userId, message) => {
  if (!socket || !socket.connected) return false;
  const uuid = toUuid(displayRoomId);
  return rawSend(uuid, userId, message);
};
