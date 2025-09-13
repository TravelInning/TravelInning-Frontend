import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const selectTravelStyle = async (styleOne, styleTwo) => {
  try {
    const { data } = await apiClient.post(`/api/mypage/travel/style`, {
      styleOne: styleOne,
      styleTwo: styleTwo,
    });
    console.log("data: ", data);
    return data.isSuccess;
  } catch (error) {
    console.log("select style error: ", error);
    showToast("오류가 발생했습니다. 다시 시도해주세요.");
    return false;
  }
};
