import apiClient from "../../../utils/apiClient";

export const loadProfile = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/my/profile`);
    return data;
  } catch (error) {
    console.log("load profile error: ", error);
    return false;
  }
};
