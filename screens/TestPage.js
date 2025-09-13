import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function TestPage({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("SelectPhoto")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>사진 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("SelectClub")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>구단 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("SignUpPhoneNumber")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("SignUpPassword")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>회원가02입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("ChatListDetail")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>게시글 채팅 목록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("LoginScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>로그인 테스트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("Chat")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>채팅창</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("CompanionPostDetail")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>동행찾기화면-지윤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("SignUpEmail")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>이메일</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.push("Splash")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>스플래시</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    height: 56,
    marginVertical: 2,
    backgroundColor: "#EFEFEF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#A5A5A5",
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Pretendard-Medium",
  },
  s_text: {
    fontSize: 12,
    lineHeight: 20,
    color: "#555555",
  },
});
