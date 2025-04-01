import { SafeAreaView } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";

export default function TermsInfoDetail({ route }) {
  const title = {
    이용약관: "(필수)서비스 이용 약관",
    "개인정보 정책": "(필수)개인정보처리방침 동의",
    "프로모션 정보 수신": "(선택)프로모션 정보 수신 동의",
  };

  return (
    <SafeAreaView style={theme.container}>
      <Header title={title[route.params.title]} />
    </SafeAreaView>
  );
}
