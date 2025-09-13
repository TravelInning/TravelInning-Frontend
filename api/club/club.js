import apiClient from "../../utils/apiClient";

export const selectClub = async (teamId) => {
  try {
    const { data } = await apiClient.post(`/api/mypage/teams/${teamId}`);
    console.log("data: ", data);
    return data.isSuccess;
  } catch (error) {
    console.log("select club error: ", error);
    return false;
  }
};
