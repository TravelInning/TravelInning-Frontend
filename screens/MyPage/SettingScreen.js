import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import { useEffect, useState } from "react";

export default function SettingScreen({ navigation }) {
  const [profileImg, setProfileImg] = useState(
    require("../../assets/icon/mypage/setting/account.png")
  );
  const contents = [
    {
      title: "프로필",
      icon: profileImg,
      onPress: () => {
        navigation.navigate("EditProfile");
      },
    },
    {
      title: "계정",
      icon: require("../../assets/icon/mypage/setting/account.png"),
      onPress: () => {},
    },
    {
      title: "개인정보 보호",
      icon: require("../../assets/icon/mypage/setting/privacy.png"),
      onPress: () => {
        navigation.navigate("PrivacySettings");
      },
    },
    {
      title: "채팅 내역",
      icon: require("../../assets/icon/mypage/setting/chat.png"),
      onPress: () => {
        navigation.replace("Main", {
          screen: "GoWith",
          params: { screen: "채팅내역" },
        });
      },
    },
    {
      title: "알림",
      icon: require("../../assets/icon/mypage/setting/notification.png"),
      onPress: () => {
        navigation.navigate("Notice");
      },
    },
    {
      title: "공지사항",
      icon: require("../../assets/icon/mypage/setting/notice.png"),
      onPress: () => {},
    },
    {
      title: "문의하기",
      icon: require("../../assets/icon/mypage/setting/cs.png"),
      onPress: () => {},
    },
    {
      title: "정보",
      icon: require("../../assets/icon/mypage/setting/info.png"),
      onPress: () => {
        navigation.navigate("TermsInfo");
      },
    },
  ];

  useEffect(() => {
    // 나중에 setProfilImg 세팅하는 코드
  }, []);

  return (
    <SafeAreaView style={theme.container}>
      <Header title="설정센터" />
      <View style={styles.container}>
        {contents.map((content, index) => (
          <TouchableOpacity
            key={index}
            onPress={content.onPress}
            style={[theme.rowContainer, { marginBottom: 20 }]}
          >
            <Image source={content.icon} style={styles.icon} />
            <Text style={styles.title}>{content.title}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomContainer}>
          {/* version */}
          <View
            style={[
              theme.rowContainer,
              {
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 20,
              },
            ]}
          >
            <Text style={styles.title}>버전</Text>
            <Text style={[styles.title, { fontSize: 14 }]}>5.8.36</Text>
          </View>
          {/* logout */}
          <TouchableOpacity style={[theme.rowContainer, { marginBottom: 20 }]}>
            <Text style={styles.title}>로그아웃</Text>
          </TouchableOpacity>
          {/* delete account */}
          <TouchableOpacity style={[theme.rowContainer, { marginBottom: 20 }]}>
            <Text style={[styles.title, { color: "#F00" }]}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  icon: {
    maxWidth: 20,
    maxHeight: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontFamily: "Pretendard-Regular",
    fontSize: 18,
    color: theme.main_black,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingBottom: 10,
  },
});
