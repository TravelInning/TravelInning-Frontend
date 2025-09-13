import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadHeader = async (teamId) => {
  try {
    const { data } = await apiClient.get(`/api/home/header?teamId=${teamId}`);
    return data;
  } catch (error) {
    console.log("header load error: ", error);
    showToast("정보 로드에 실패했습니다. 다시 접속해주세요.");
    return false;
  }
};

export const loadPlace = async ({
  teamId,
  categoryCodes,
  useDefaultCategory,
  myScrapOnly,
  sort,
}) => {
  try {
    const { data } = await apiClient.get(
      `/api/stadium-attractions/list?teamId=${teamId}&categoryCodes=${categoryCodes}&useDefaultCategory=${useDefaultCategory}&myScrapOnly=${myScrapOnly}&sort=${sort}`
    );
    return data;
  } catch (error) {
    console.log("place load error: ", error);
    showToast("정보 로드에 실패했습니다. 다시 접속해주세요.");
    return false;
  }
};
