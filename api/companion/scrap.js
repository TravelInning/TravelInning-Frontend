import apiClient from "../../utils/apiClient";

export const addPostScrap = async (postId) => {
  await apiClient.post(`/api/companionPost/scrap/${postId}`);
  console.log("스크랩 추가!");
};

export const cancelPostScrap = async (postId) => {
  await apiClient.delete(`/api/companionPost/scrap/${postId}`);
  console.log("스크랩 취소!");
};

export const loadScrapPosts = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/scraps/companion-posts`);
    console.log("scrap load: ", data);
    return data.result;
  } catch (error) {
    console.log("load scrap posts error: ", error);
    return false;
  }
};
