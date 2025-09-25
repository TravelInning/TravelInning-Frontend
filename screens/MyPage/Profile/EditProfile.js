import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Header } from "../../../component/Header/Header";
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../colors/color";
import { showToast } from "../../../component/Toast";
import { ConfirmBtn } from "../../../component/MyPage/Profile/ConfirmBtn";
import { EditProfileNavBtn } from "../../../component/MyPage/Profile/EditProfileNavBtn";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { loadProfile, uploadProfileImage } from "../../../api/mypage/profile";

const sections = ["닉네임", "성별", "소개 메시지"];
const genderLabel = (g) =>
  g === "MALE" ? "남자" : g === "FEMALE" ? "여자" : "";

export default function EditProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({
    profileImgUrl: "",
    nickname: "",
    gender: "",
    introduceMessage: "",
  });

  const [localImageUri, setLocalImageUri] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const prof = await loadProfile();
      if (prof.isSuccess) {
        const r = prof.result;
        setProfile({
          profileImgUrl: r.profileImgUrl,
          nickname: r.nickname,
          gender: r.gender,
          introduceMessage: r.introduceMessage,
        });
        setLocalImageUri(null);
      }
    })();
  }, [isFocused]);

  const requestMediaPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast("사진 접근 권한이 필요해요.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const ok = await requestMediaPermission();
    if (!ok) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!res.canceled && res.assets?.length) {
      const uri = res.assets[0].uri;
      setLocalImageUri(uri);
      setProfile((p) => ({ ...p, profileImgUrl: uri }));
    }
  };

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      let newUrl = null;

      if (localImageUri) {
        const data = await uploadProfileImage(localImageUri);
        if (!data?.isSuccess) {
          showToast("프로필 이미지 업로드에 실패했습니다.");
          setSubmitting(false);
          return;
        }
        newUrl = data?.result?.profileImgUrl || "";
        setProfile((p) => ({ ...p, profileImgUrl: newUrl }));
      }

      showToast("저장 완료!");
      if (newUrl) {
        DeviceEventEmitter.emit("PROFILE_UPDATED", `${newUrl}?t=${Date.now()}`);
      }
      navigation.goBack();
    } catch (e) {
      console.log("upload error: ", e);
      showToast("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <Header title="프로필 변경" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={
            profile?.profileImgUrl
              ? { uri: profile.profileImgUrl }
              : require("../../../assets/images/companion/logo.png")
          }
          style={styles.profileImage}
        />

        <TouchableOpacity onPress={pickImage} disabled={submitting}>
          <Text style={styles.profileImgText}>프로필 이미지</Text>
        </TouchableOpacity>
        <View style={styles.btnGroup}>
          {sections.map((title) => (
            <EditProfileNavBtn
              key={title}
              title={title}
              content={
                title === "닉네임"
                  ? profile.nickname
                  : title === "성별"
                  ? genderLabel(profile.gender)
                  : undefined
              }
              navFunc={() =>
                navigation.navigate("EditDetail", {
                  title,
                  content: {
                    nickname: profile.nickname ?? "",
                    gender: profile.gender ?? "",
                    introduceMessage: profile.introduceMessage ?? "",
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ opacity: submitting ? 0.6 : 1 }}>
        <ConfirmBtn confirmFunc={handleConfirm} disabled={submitting} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 23,
    alignItems: "center",
  },
  profileImage: {
    width: SCREEN_HEIGHT / 8,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: SCREEN_WIDTH / 10,
    marginBottom: 20,
  },
  profileImgText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: theme.main_blue,
    borderBottomWidth: 1,
    borderBottomColor: theme.main_blue,
    marginBottom: 40,
  },
  btnGroup: {
    width: "100%",
    gap: 20,
  },
});
