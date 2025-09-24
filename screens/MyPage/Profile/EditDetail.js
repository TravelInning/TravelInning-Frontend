import { SafeAreaView } from "react-native";
import { Header } from "../../../component/Header/Header";
import { theme } from "../../../colors/color";
import EditNickname from "../../../component/MyPage/Profile/EditNickname";
import EditGender from "../../../component/MyPage/Profile/EditGender";
import EditIntroduce from "../../../component/MyPage/Profile/EditIntroduce";

const titleMap = {
  닉네임: "닉네임 변경",
  성별: "성별 정보 수정",
  "소개 메시지": "소개 메시지 수정",
};

export default function EditDetail({ route }) {
  const { title } = route.params;
  console.log(title);

  return (
    <SafeAreaView style={theme.container}>
      <Header title={titleMap[title]} />
      {title === "닉네임" ? (
        <EditNickname />
      ) : title === "성별" ? (
        <EditGender />
      ) : (
        <EditIntroduce />
      )}
    </SafeAreaView>
  );
}
