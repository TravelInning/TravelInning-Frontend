import apiClient from "../../utils/apiClient";

export const loadProfile = async () => {
  try {
    const { data } = await apiClient.get(`/api/mypage/my/profile`);
    return data;
  } catch (error) {
    console.log("load profile error: ", error);
    return null;
  }
};

export const changeProfile = async ({ nickname, gender, introduceMessage }) => {
  try {
    const { data } = await apiClient.put(`/api/mypage/profile/modify`, {
      nickname,
      gender,
      introduceMessage,
    });
    console.log("변경: ", data);
    return data?.isSuccess || null;
  } catch (error) {
    console.log("change profile error: ", error);
    return null;
  }
};

export const uploadProfileImage = async (uri) => {
  const name = uri.split("/").pop() || "profile.jpg";
  const ext = name.split(".").pop() || "jpg";
  const mime =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : "image/jpeg";

  const formData = new FormData();
  formData.append("profile", {
    uri,
    name,
    type: mime,
  });

  const { data } = await apiClient.put(
    "/api/mypage/profile-image/upload",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};
