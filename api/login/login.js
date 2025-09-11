import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";

export const changePassword = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/members/find/password`, {
      email: email,
      password: password,
    });
    return data.isSuccess;
  } catch (error) {
    console.log("change password error: ", error);
    showToast("오류가 발생했습니다. 다시 시도해주세요.");
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/members/login`, {
      email: email,
      password: password,
    });
    return response.data.isSuccess;
  } catch (error) {
    console.log("login error: ", error);
    showToast("아이디와 비밀번호를 확인해주세요.");
    return false;
  }
};
