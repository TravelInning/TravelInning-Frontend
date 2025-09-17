import { showToast } from "../../component/Toast";
import apiClient from "../../utils/apiClient";

export const loadPlaceBlock = async (travelRegionId) => {
  try {
    await apiClient.get(`/api/travel/regions/${travelRegionId}/block`);
  } catch (error) {
    console.log("load block error: ", error);
  }
};

export const addPlaceBlock = async (travelRegionId) => {
  await apiClient.post(`/api/travel/regions/${travelRegionId}/block`);
};

export const cancelPlaceBlock = async (travelRegionId) => {
  try {
    const { data } = await apiClient.delete(
      `/api/travel/regions/${travelRegionId}/block`
    );
    return data.isSuccess;
  } catch (error) {
    showToast("차단 해제 실패! 다시 시도해주세요.");
    console.log("cancel block error: ", error);
    return false;
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
