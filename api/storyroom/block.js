import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const addStoryPostBlock = async (postId) => {
  try {
    const { data } = await apiClient.post(
      `/api/storyRoom/post/block/${postId}`
    );
    if (data?.isSuccess) {
      showToast("차단 완료! 해제는 마이페이지 설정에서 할 수 있어요.");
      return true;
    }
    showToast("차단 실패! 다시 시도해주세요.");
    return false;
  } catch (error) {
    showToast("차단 실패! 다시 시도해주세요.");
    console.log("addStoryRoomBlock error: ", error);
    return false;
  }
};

export const cancelStoryPostBlock = async (postId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/storyRoom/post/block/${postId}`
    );
    if (data?.isSuccess) {
      showToast("차단 해제 완료!");
      return true;
    }
    showToast("차단 해제 실패! 다시 시도해주세요.");
    return false;
  } catch (error) {
    showToast("차단 해제 실패! 다시 시도해주세요.");
    console.log("cancelStoryRoomBlock error: ", error);
    return false;
  }
};

export const loadBlockedStoryRooms = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/blocked/story-posts`);
    return data.result;
  } catch (error) {
    console.log("load blocked rooms error: ", error);
    showToast("게시글 로드에 실패했습니다!");
    return false;
  }
};
