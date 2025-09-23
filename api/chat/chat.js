import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadChatList = async (cursor, size = 20) => {
  try {
    const params = { size };
    if (cursor != null) params.cursor = cursor;
    const { data } = await apiClient.get("/api/chats/rooms", { params });
    console.log("load chat list: ", data.result.rooms);
    return data?.result;
  } catch (error) {
    console.error("loadChatList error: ", error);
    showToast("채팅을 불러오지 못했습니다! 다시 시도해주세요.");
    return null;
  }
};

export const loadRoomSummary = async (roomId) => {
  try {
    const { data } = await apiClient.get(`/api/chats/rooms/${roomId}/summary`);
    return data?.result;
  } catch (error) {
    console.error(
      "loadRoomSummary error: ",
      error?.response?.data || error?.message
    );
    return null;
  }
};

export const loadMessages = async ({
  roomId,
  cursor,
  size = 20,
  dir = "next",
}) => {
  try {
    const params = { size, dir };
    if (cursor != null) params.cursor = cursor;
    const { data } = await apiClient.get(
      `/api/compnaion/chats/rooms/${roomId}/messages`,
      { params }
    );
    return data?.result;
  } catch (error) {
    console.error(
      "loadMessages error: ",
      error?.response?.data || error?.message
    );
    return null;
  }
};

export const leaveChat = async (roomId) => {
  try {
    const { data } = await apiClient.post(`/api/chats/rooms/${roomId}/leave`);
    console.log("leave chatRoom: ", data);
  } catch (error) {
    console.error("leave chatRoom error: ", error);
    showToast("잠시 후 다시 시도해주세요.");
  }
};

export const createOneChat = async (postId) => {
  try {
    const { data } = await apiClient.post(
      `/api/compnaion/chats/rooms/OneOnOne?postId=${postId}`
    );
    console.log("create 1:1Room: ", data);
    return data.result;
  } catch (error) {
    console.error("create 1:1Room error: ", error);
    return null;
  }
};

export const createGroupChat = async (postId, ownerId) => {
  try {
    const { data } = await apiClient.post(`/api/compnaion/chats/rooms/invite`, {
      postId,
      ownerId,
    });
    console.log("create GroupRoom: ", data);
    return data;
  } catch (error) {
    console.error("create GroupRoom error: ", error);
    showToast("잠시 후 다시 시도해주세요.");
    return null;
  }
};

export const joinByInvite = async (inviteCode, userId) => {
  try {
    const { data } = await apiClient.post(
      `/api/compnaion/chats/rooms/joinByInvite?inviteCode=${encodeURIComponent(
        inviteCode
      )}&userId=${userId}`
    );
    return data;
  } catch (error) {
    console.error("move to GroupRoom error: ", error);
    return null;
  }
};
