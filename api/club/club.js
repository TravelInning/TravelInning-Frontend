import apiClient from "../../utils/apiClient";

export const enrollClub = async (teamId) => {
  try {
    const { data } = await apiClient.post(`/api/mypage/teams/${teamId}`);
    console.log("구단 등록: ", data);
    return data.isSuccess;
  } catch (error) {
    console.log("select club error: ", error);
    return false;
  }
};

export const loadClub = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/teams`);
    return data;
  } catch (error) {
    const status = error?.response?.status;
    const body = error?.response?.data;
    console.log("load club error:", status, body);
    return null;
  }
};
