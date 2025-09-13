import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadPlaceBlock = async (postId) => {
  try {
    const { data } = await apiClient.get(`/api/companionPost/${postId}/block`);
    console.log(data);
  } catch (error) {
    console.log("load block error: ", error);
  }
};
