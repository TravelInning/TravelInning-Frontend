import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadCompanionPosts = async ({
  page = 0,
  size = 10,
  sortType,
  statusFilter,
}) => {
  try {
    const { data } = await apiClient.get(
      `/api/companionPost/list?page=${page}&size=${size}&sort=createdAt%2CDESC&sortType=${sortType}&statusFilter=${statusFilter}`
    );
    return data.result.content;
  } catch (error) {
    console.log("load post error: ", error);
    showToast("글 불러오기에 실패했습니다! 다시 시도해주세요!");
  }
};

export const createPost = async ({
  title,
  content,
  status = "FINDING",
  travelStatus = "Baseball",
  images = [],
}) => {
  try {
    const formData = new FormData();

    if (images.length > 0) {
      images.forEach((uri, index) => {
        formData.append("imageFiles", {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });
    } else {
      formData.append("imageFiles", "");
    }

    await apiClient.post(
      `/api/companionPost/create?title=${encodeURIComponent(
        title
      )}&content=${encodeURIComponent(
        content
      )}&status=${status}&travelStatus=${travelStatus}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    showToast("작성 완료!");
  } catch (error) {
    console.log("create post error: ", error);
    showToast("작성 중 오류가 발생했습니다! 다시 시도해주세요.");
  }
};

export const loadPublicPost = async (postId) => {
  try {
    const { data } = await axios.get(`/api/companionPost/public/${postId}`);

    console.log("public post: ", data);
  } catch (error) {
    console.log("load public post error: ", error);
    showToast("게시글을 불러오는데 실패했습니다! 다시 시도해주세요.");
  }
};

export const loadPost = async (postId) => {
  try {
    const { data } = await apiClient.get(`/api/companionPost/${postId}`);
    console.log(data);
    return data.result;
  } catch (error) {
    showToast("게시글을 불러오는데 실패했습니다! 다시 시도해주세요.");
    return null;
  }
};

export const changePostState = async (postId, status) => {
  try {
    await apiClient.patch(`/api/companionPost/${postId}/status`, {
      status,
    });
  } catch (error) {
    showToast("상태변경 실패! 다시 시도해주세요.");
  }
};

export const deletePost = async (postId) => {
  try {
    await apiClient.delete(`/api/companionPost/${postId}`);
    showToast("삭제 완료!");
  } catch (error) {
    showToast("삭제 실패! 다시 시도해주세요.");
  }
};
