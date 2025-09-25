import { SafeAreaView } from "react-native";
import { Header } from "../../../component/Header/Header";
import { theme } from "../../../colors/color";
import EditNickname from "../../../component/MyPage/Profile/EditNickname";
import EditGender from "../../../component/MyPage/Profile/EditGender";
import EditIntroduce from "../../../component/MyPage/Profile/EditIntroduce";
import { useMemo, useState } from "react";
import { ConfirmBtn } from "../../../component/MyPage/Profile/ConfirmBtn";
import { changeProfile } from "../../../api/mypage/profile";
import { showToast } from "../../../component/Toast";

const titleMap = {
  닉네임: "닉네임 변경",
  성별: "성별 정보 수정",
  "소개 메시지": "소개 메시지 수정",
};

export default function EditDetail({ route, navigation }) {
  const { title, content } = route.params;
  const [profile, setProfile] = useState(content);
  const initial = useMemo(() => content, []);

  const getCurrentValue = () => {
    if (title === "닉네임") return (profile.nickname || "").trim();
    if (title === "성별") return profile.gender || "";
    return (profile.introduceMessage || "").trim();
  };

  const hasChange =
    profile.nickname !== initial.nickname ||
    profile.gender !== initial.gender ||
    profile.introduceMessage !== initial.introduceMessage;

  const isCurrentEmpty = () => {
    const v = getCurrentValue();
    return v === "";
  };

  const handleSubmit = async () => {
    if (isCurrentEmpty()) {
      showToast("내용을 입력해주세요!");
      return;
    }
    if (!hasChange) {
      showToast("변경사항이 없습니다.");
      return;
    }

    const nickname = (profile.nickname || "").trim();
    const introduceMessage = (profile.introduceMessage || "").trim();
    const gender = profile.gender;

    if (title === "성별" && gender !== "MALE" && gender !== "FEMALE") {
      showToast("성별을 선택해주세요!");
      return;
    }

    const payload = { nickname, gender, introduceMessage };

    const ok = await changeProfile(payload);
    if (ok) {
      showToast("프로필 변경 완료!");
      navigation.goBack();
    } else {
      showToast("오류가 발생하여 프로필 변경에 실패했습니다.");
    }
  };

  const disabled = isCurrentEmpty() || !hasChange;

  return (
    <SafeAreaView style={theme.container}>
      <Header title={titleMap[title]} />
      {title === "닉네임" ? (
        <EditNickname
          value={profile.nickname}
          onChange={(text) => setProfile((p) => ({ ...p, nickname: text }))}
        />
      ) : title === "성별" ? (
        <EditGender
          value={profile.gender}
          onChange={(g) => setProfile((p) => ({ ...p, gender: g }))}
        />
      ) : (
        <EditIntroduce
          value={profile.introduceMessage}
          onChange={(text) =>
            setProfile((p) => ({ ...p, introduceMessage: text }))
          }
          maxLength={50}
        />
      )}
      <ConfirmBtn disabled={disabled} confirmFunc={handleSubmit} />
    </SafeAreaView>
  );
}
