import apiClient from "../../utils/apiClient";

export const loadMyTravelInningList = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage`);
    console.log("loadTravelInningList load: ", data);
    return data.result;
  } catch (error) {
    console.log("loadTravelInningList error: ", error);
    return false;
  }
};

export const saveMyTravelInning = async () => {
  try {
    const { data } = await apiClient.post(`/api/mypage`);
    console.log("saveMyTravelInning load: ", data);
    return data;
  } catch (error) {
    console.log("saveMyTravelInning error: ", error);
    return false;
  }
};
