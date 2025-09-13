import apiClient from "../../utils/apiClient";

export const loadPlaceScrap = async (travelRegionId) => {
  const { data } = await apiClient.get(
    `/api/travel/regions/${travelRegionId}/scrap`
  );
  console.log(data);
  return data.result;
};

export const addPlaceScrap = async (travelRegionId) => {
  const { data } = await apiClient.post(
    `/api/travel/regions/${travelRegionId}/scrap`
  );
  console.log(data);
};

export const cancelPlaceScrap = async (travelRegionId) => {
  const { data } = await apiClient.delete(
    `/api/travel/regions/${travelRegionId}/scrap`
  );
  console.log(data);
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
