import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";

export const loadHeader = async (teamId) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/home/header`, {
      teamId: teamId,
    });

    return data;
  } catch (error) {
    console.log("verify email code error: ", error);
    showToast("정보 로드에 실패했습니다. 다시 접속해주세요.");
    return false;
  }
};
