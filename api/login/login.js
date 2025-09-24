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
  const { data } = await axios.post(`${API_URL}/api/members/login`, {
    email: email,
    password: password,
  });
  return data.result;
};

export const logout = async (token) => {
  const { data } = await axios.post(
    `${API_URL}/api/members/auth/logout?token=${token}`
  );
  return data.isSuccess;
};

export const refresh = async (refreshToken) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/members/auth/refresh?refreshToken=${refreshToken}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log("refresh error: ", error);
    return false;
  }
};
