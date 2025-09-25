import apiClient from "../../utils/apiClient";

export const loadMyCompanionPosts = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/companion-posts`);
    console.log("mypost load: ", data);
    return data.result;
  } catch (error) {
    console.log("load my posts error: ", error);
    return false;
  }
};

export const loadMyStoryPosts = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/story-posts`);
    console.log("mypost load: ", data);
    return data.result;
  } catch (error) {
    console.log("load my posts error: ", error);
    return false;
  }
};
