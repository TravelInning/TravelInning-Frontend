import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadPlaceBlock = async (travelRegionId) => {
  try {
    const { data } = await apiClient.get(
      `/api/travel/regions/${travelRegionId}/block`
    );
    console.log(data);
  } catch (error) {
    console.log("load block error: ", error);
  }
};

export const addPlaceBlock = async (travelRegionId) => {
  const { data } = await apiClient.post(
    `/api/travel/regions/${travelRegionId}/block`
  );
  console.log(data);
};

export const cancelPlaceBlock = async (travelRegionId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/travel/regions/${travelRegionId}/block`
    );
    console.log(data);
  } catch (error) {
    showToast("차단 해제 실패! 다시 시도해주세요.");
    console.log("cancel block error: ", error);
  }
};

export const loadBlockedPlaces = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/blocked/travel-regions`);
    return data.result;
  } catch (error) {
    console.log("load blocked places error: ", error);
    showToast("장소 로드에 실패했습니다!");
    return false;
  }
};
