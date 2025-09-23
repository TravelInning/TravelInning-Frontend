import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const addPostBlock = async (postId) => {
  try {
    const { data } = await apiClient.post(`/api/companionPost/${postId}/block`);
    console.log(data);
    showToast("차단 완료! 해제를 원할 시 마이페이지 설정으로 들어가주세요.");
  } catch (error) {
    showToast("차단 실패! 다시 시도해주세요.");
  }
};

export const cancelPostBlock = async (postId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/companionPost/${postId}/block`
    );
    return data.isSuccess;
  } catch (error) {
    showToast("차단 해제 실패! 다시 시도해주세요.");
    console.log("cancel block error: ", error);
    return false;
  }
};

export const loadBlockedPosts = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/blocked/companion-posts`);
    return data.result;
  } catch (error) {
    console.log("load blocked posts error: ", error);
    showToast("게시글 로드에 실패했습니다!");
    return false;
  }
};
