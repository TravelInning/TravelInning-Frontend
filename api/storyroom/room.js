// src/api/storyroom/storyroom.js
import apiClient from "../../utils/apiClient";
import { showToast } from "../../component/Toast";

/** ENUM
 * topic: "BASEBALL" | "NEWS" | "DAILY" | "LOVE"
 * limitTime: "MINUTES_30" | "HOURS_1" | "HOURS_2" | "HOURS_3"
 * status: "IN_PROGRESS" | "ENDED"
 * sortType: "LATEST" | "SCRAP"
 */

export const createStoryPost = async ({
  title = "",
  content,
  topic,
  limitTime,
  images = [],
}) => {
  try {
    const form = new FormData();

    if (images.length > 0) {
      images.forEach((uri, index) => {
        form.append("imageFiles", {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
    } else {
      form.append("imageFiles", "");
    }

    const { data } = await apiClient.post(
      `/api/storyRoom/post/create?title=${encodeURIComponent(
        title
      )}&content=${encodeURIComponent(
        content
      )}&topic=${topic}&limitTime=${limitTime}`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (data?.id || data?.roomId) {
      showToast("게시글이 생성되었어요!");
      return data;
    }

    showToast("게시글 생성에 실패했어요. 다시 시도해주세요.");
    return null;
  } catch (error) {
    console.log("createStoryPost error: ", error);
    showToast("게시글 생성 실패! 다시 시도해주세요.");
    return false;
  }
};

// (로그인 필요) 게시글 상세 조회
export const loadStoryPostDetail = async (postId) => {
  try {
    const { data } = await apiClient.get(`/api/storyRoom/post/${postId}`);
    return data?.result ?? data ?? null;
  } catch (error) {
    console.log("loadStoryPostDetail error: ", error);
    showToast("게시글 정보를 불러오지 못했어요.");
    return false;
  }
};

// (비회원 가능) 공개용 게시글 상세 조회
export const loadPublicStoryPostDetail = async (postId) => {
  try {
    const { data } = await apiClient.get(
      `/api/storyRoom/post/public/${postId}`
    );
    return data?.result ?? null;
  } catch (error) {
    console.log("loadPublicStoryPostDetail error: ", error);
    showToast("게시글 정보를 불러오지 못했어요.");
    return false;
  }
};

export const deleteStoryPost = async (postId) => {
  try {
    const { data } = await apiClient.delete(`/api/storyRoom/post/${postId}`);
    if (data?.isSuccess) showToast("게시글 삭제 완료!");
    else showToast("게시글 삭제에 실패했어요.");
    return !!data?.isSuccess;
  } catch (error) {
    showToast("게시글 삭제 실패! 다시 시도해주세요.");
    return false;
  }
};

export const loadStoryRoomList = async ({ status, sortType, topic } = {}) => {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (sortType) params.append("sortType", sortType);
    if (topic) params.append("topic", topic);

    const qs = params.toString();
    const url = qs
      ? `/api/storyRoom/post/list?${qs}`
      : `/api/storyRoom/post/list`;

    const { data } = await apiClient.get(url);
    return data?.result ?? [];
  } catch (error) {
    console.log("loadStoryPostList error: ", error);
    showToast("게시글 목록 로드에 실패했어요!");
    return false;
  }
};
