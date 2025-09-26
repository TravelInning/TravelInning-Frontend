// api/storychat/storyChat.js
import apiClient from "../../utils/apiClient";
import { normalizeRoomId } from "../../utils/normalizeRoomId";

export const enterStoryRoom = async (roomId, memberId) => {
  const rid = normalizeRoomId(roomId);
  const { data } = await apiClient.post(
    `/api/story/chats/rooms/${rid}/enter`,
    null,
    {
      params: { memberId },
    }
  );
  return data?.isSuccess === true;
};

export const leaveStoryRoom = async (roomId, memberId) => {
  const rid = normalizeRoomId(roomId);
  const { data } = await apiClient.post(
    `/api/story/chats/rooms/${rid}/leave`,
    null,
    {
      params: { memberId },
    }
  );
  return data?.isSuccess === true;
};

export const fetchStoryMessages = async ({
  roomId,
  meId,
  size = 20,
  cursor,
  direction = "prev",
}) => {
  const rid = normalizeRoomId(roomId);
  const { data } = await apiClient.get(
    `/api/story/chats/rooms/${rid}/messages`,
    {
      params: { meId, size, cursor, direction },
    }
  );
  return data?.result ?? null;
};

export const fetchRemainingSeconds = async (roomId) => {
  const rid = normalizeRoomId(roomId);
  const { data } = await apiClient.get(
    `/api/story/chats/rooms/${rid}/remaining-seconds`
  );
  return typeof data?.result === "number" ? data.result : null;
};

export const fetchParticipantsCount = async (roomId) => {
  const rid = normalizeRoomId(roomId);
  const { data } = await apiClient.get(
    `/api/story/chats/rooms/${rid}/participants/count`
  );
  return typeof data?.result === "number" ? data.result : null;
};
