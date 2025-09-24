import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const addStoryPostScrap = async (postId) => {
  try {
    const { data } = await apiClient.post(
      `/api/storyRoom/post/scrap/${postId}`
    );
    if (data?.isSuccess) {
      showToast("스크랩 완료!");
      return true;
    }
    showToast("스크랩 실패! 다시 시도해주세요.");
    return false;
  } catch (e) {
    showToast("스크랩 실패! 다시 시도해주세요.");
    console.log("addStoryRoomScrap error:", e);
    return false;
  }
};

export const cancelStoryPostScrap = async (postId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/storyRoom/post/scrap/${postId}`
    );
    if (data?.isSuccess) {
      showToast("스크랩 해제 완료!");
      return true;
    }
    showToast("스크랩 해제 실패! 다시 시도해주세요.");
    return false;
  } catch (e) {
    showToast("스크랩 해제 실패! 다시 시도해주세요.");
    console.log("cancelStoryRoomScrap error:", e);
    return false;
  }
};

export const loadScrapStoryRooms = async () => {
  const { data } = await apiClient.get(`/api/mypage/scraps/story-posts`);
  return data?.result ?? [];
};
