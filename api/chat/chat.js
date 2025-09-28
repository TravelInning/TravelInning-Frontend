import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadPostLists = async () => {
  try {
    const { data } = await apiClient.get(`api/chats/companion/active-posts`);
    return data?.result;
  } catch (error) {
    showToast("채팅내역을 불러오는데 실패했습니다. 다시 시도해주세요.");
    console.log("loadPostLists error: ", error);
    return null;
  }
};

export const loadPostChatLists = async (postId) => {
  try {
    const { data } = await apiClient.get(
      `api/chats/companion/${postId}/active-rooms`
    );
    return data?.result;
  } catch (error) {
    showToast("정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
    console.log("loadPostChatLists error: ", error);
    return null;
  }
};

export const loadPostHeader = async (postId) => {
  try {
    const { data } = await apiClient.get(
      `/api/chats/companion/${postId}/header`
    );
    console.log("loadPostHeader : ", data.result);
    return data?.result;
  } catch (error) {
    console.error(
      "loadPostHeader error: ",
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
      `/api/companion/chats/rooms/${roomId}/messages`,
      { params }
    );
    console.log("load messages : ", data.result);

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
      `/api/companion/chats/rooms/OneOnOne?postId=${postId}`
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
    const { data } = await apiClient.post(`/api/companion/chats/rooms/invite`, {
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
      `/api/companion/chats/rooms/joinByInvite?inviteCode=${encodeURIComponent(
        inviteCode
      )}&userId=${userId}`
    );
    return data;
  } catch (error) {
    console.error("move to GroupRoom error: ", error);
    return null;
  }
};

export const markRoomRead = async (roomId, lastMessageId) => {
  try {
    await apiClient.post(`/api/chats/rooms/${roomId}/read`, null, {
      params: { lastMessageId },
    });
    return true;
  } catch (e) {
    console.log("markRoomRead error:", e?.response?.data || e?.message);
    return false;
  }
};
