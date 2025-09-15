import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { refresh } from "../api/login/login";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        try {
          const data = await refresh(refreshToken);
          if (data?.result?.accessToken) {
            await AsyncStorage.setItem("accessToken", data.result.accessToken);
            await SecureStore.setItemAsync(
              "refreshToken",
              data.result.refreshToken
            );

            apiClient.defaults.headers.Authorization = `Bearer ${data.result.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.result.accessToken}`;

            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.log("refresh failed:", refreshError);
        }
      }

      await AsyncStorage.removeItem("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
