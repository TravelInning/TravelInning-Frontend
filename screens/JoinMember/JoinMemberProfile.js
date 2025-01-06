import {
  SafeAreaView,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { theme } from "../../colors/color";
import { useEffect, useState } from "react";
import {
  TopLayout,
  JoinMemberStyle,
  JoinMemberBtn,
} from "../../component/JoinMemberComp";

export default function JoinMemberProfile({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(null);
  const [introMessage, setIntroMessage] = useState("");
  const [focused, setFocused] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // keyboard detect
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={theme.container}>
      <View style={JoinMemberStyle.subContainer}>
        <TopLayout
          title={"프로필을\n작성해주세요."}
          subtext={
            "동행 신청 시 상대방에게 공개되며\n마이페이지에서 언제든 변경할 수 있습니다."
          }
          imageSource={require("../../assets/images/joinmembership/profile_icon.png")}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              JoinMemberStyle.subText_black,
              { fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            닉네임
          </Text>
          <TextInput
            placeholder="닉네임 입력"
            placeholderTextColor={"#919191"}
            onChangeText={setNickname}
            onFocus={() => setFocused("nickname")}
            keyboardType="default"
            autoCapitalize="none"
            autoFocus={true}
            style={{
              ...JoinMemberStyle.textInputStyle,
              borderColor: focused === "nickname" ? theme.main_blue : "#EDEDED",
            }}
          />
          <Text
            style={[
              JoinMemberStyle.subText_black,
              { fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            성별
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: 12, marginBottom: 20 }}
          >
            <TouchableOpacity
              onPress={() => {
                setGender("M");
                setFocused("gender");
              }}
              style={[
                styles.button,
                gender === "M" && { backgroundColor: theme.main_blue },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  gender == "M" && {
                    fontFamily: "Pretendard-Bold",
                    color: "#fff",
                  },
                ]}
              >
                남성
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              onPress={() => {
                setGender("F");
                setFocused("gender");
              }}
              style={[
                styles.button,
                gender === "F" && { backgroundColor: theme.main_blue },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  gender == "F" && {
                    fontFamily: "Pretendard-Bold",
                    color: "#fff",
                  },
                ]}
              >
                여성
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              JoinMemberStyle.subText_black,
              { fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            소개 메시지
          </Text>
          <TextInput
            placeholder="소개 메시지 입력"
            placeholderTextColor={"#919191"}
            onChangeText={setIntroMessage}
            onFocus={() => setFocused("message")}
            keyboardType="default"
            autoCapitalize="none"
            style={{
              ...JoinMemberStyle.textInputStyle,
              borderColor: focused === "message" ? theme.main_blue : "#EDEDED",
            }}
          />
        </ScrollView>
      </View>
      {!isKeyboardVisible && (
        <JoinMemberBtn
          nextCondition={nickname && gender && introMessage}
          nextFunction={() => navigation.push("JoinMemberTerms")}
          backText={"뒤로"}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  buttonText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: "#919191",
  },
});
