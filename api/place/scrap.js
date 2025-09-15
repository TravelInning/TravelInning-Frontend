import apiClient from "../../utils/apiClient";

export const loadPlaceScrap = async (travelRegionId) => {
  const { data } = await apiClient.get(
    `/api/travel/regions/${travelRegionId}/scrap`
  );
  return data.result;
};

export const addPlaceScrap = async (travelRegionId) => {
  await apiClient.post(`/api/travel/regions/${travelRegionId}/scrap`);
};

export const cancelPlaceScrap = async (travelRegionId) => {
  await apiClient.delete(`/api/travel/regions/${travelRegionId}/scrap`);
};

export const loadScrapPlaces = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/scraps/travel-regions`);
    return data.result;
  } catch (error) {
    console.log("load scrap places error: ", error);
    return false;
  }
};
