import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadCompanionPosts = async () => {
  try {
    const { data } = await apiClient.get(`/api/companionPost/list`);
    console.log(data);
    return;
  } catch (error) {
    console.log("load block error: ", error);
  }
};
