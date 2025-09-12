import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadHeader = async (teamId) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    console.log(`${API_URL}/api/home/header?teamId=${teamId}`);
    const { data } = await axios.get(
      `${API_URL}/api/home/header?teamId=${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("header load error: ", error);
    showToast("정보 로드에 실패했습니다. 다시 접속해주세요.");
    return false;
  }
};
