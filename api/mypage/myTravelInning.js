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

export const saveMyTravelInning = async ({
  date,
  opponentTeamId,
  content,
  imageUri,
}) => {
  try {
    const form = new FormData();

    const requestJson = {
      date,
      opponentTeamId: Number(opponentTeamId),
      content: content || "",
    };
    form.append("request", JSON.stringify(requestJson));

    if (imageUri) {
      const filename = imageUri.split("/").pop() || `image_${Date.now()}.jpg`;
      const ext = (filename.split(".").pop() || "").toLowerCase();
      const mime =
        ext === "png"
          ? "image/png"
          : ext === "webp"
          ? "image/webp"
          : "image/jpeg";

      form.append("image", {
        uri: imageUri,
        name: filename,
        type: mime,
      });
    }

    const { data } = await apiClient.post("/api/mypage", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log("saveMyTravelInning error:", error);
    return false;
  }
};
