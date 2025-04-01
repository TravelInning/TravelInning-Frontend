import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import Arrow from "../../assets/icon/mypage/right_arrow_gray.svg";

export default function PrivacySettingsScreen({ navigation }) {
  const contents = [
    {
      title: "추천",
      subtitle: "추천받지 않는 여행지 목록",
      description: "",
    },
    {
      title: "삭제",
      subtitle: "삭제한 게시글 목록",
      description: "",
    },
    {
      title: "차단",
      subtitle: "차단한 게시글 목록",
      description:
        "동행구하기 게시판에서 내가 차단한 게시글 목록입니다. 해당 게시글에는 스크랩, 대화 신청을 할 수 없습니다.",
    },
    {
      title: "신고",
      subtitle: "신고한 게시글 목록",
      description:
        "이야기방 게시판에서 내가 신고한 게시글 목록입니다. 해당 게시글에는 스크랩, 이야기 참여를 할 수 없습니다.",
    },
  ];

  return (
    <SafeAreaView style={theme.container}>
      <Header title="개인정보 보호" />
      <View style={styles.container}>
        {contents.map((item, index) => (
          <View key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PrivacySettingsDetail", {
                  title: item.title,
                  subtitle: item.subtitle,
                })
              }
            >
              <View style={styles.rowContainer}>
                <Text style={styles.subTitle}>
                  {index === 0 && "더 이상 "}
                  {item.subtitle}
                </Text>
                <Arrow width={14} height={12} style={{ marginTop: -10 }} />
              </View>
              <Text
                style={{
                  ...styles.description,
                  marginBottom: item.description && 18,
                }}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: theme.main_black,
    marginBottom: 14,
    marginTop: 18,
  },
  subTitle: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: theme.main_black,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: "#919191",
  },
});
