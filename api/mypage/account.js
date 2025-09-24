import apiClient from "../../utils/apiClient";

export const deleteAccount = async () => {
  const { data } = await apiClient.delete(`/api/mypage/delete`);
  console.log("delete account: ", data);
  return data;
};
