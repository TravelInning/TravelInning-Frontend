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
import { TopLayout, SignUpStyle, SignUpBtn } from "../../component/SignUpComp";
import { handleNickname } from "../../api/signup/signup";

export default function SignUpProfile({ navigation, route }) {
  const [nickname, setNickname] = useState("");
  const [nicknameisValid, setNicknameisValid] = useState(null);
  const [gender, setGender] = useState(null);
  const [introMessage, setIntroMessage] = useState("");
  const [focused, setFocused] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const { email, password } = route.params;

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

  const checkNickname = () => {
    const isValid = handleNickname(nickname, setIsError);
    // UI 변경용
    if (isValid) {
      setNicknameisValid(true);
    } else {
      setNicknameisValid(false);
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={SignUpStyle.subContainer}>
        {!isKeyboardVisible && (
          <TopLayout
            title={"프로필을\n작성해주세요."}
            subtext={
              "동행 신청 시 상대방에게 공개되며\n마이페이지에서 언제든 변경할 수 있습니다."
            }
            imageSource={require("../../assets/images/signup/profile_icon.png")}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              SignUpStyle.subText_black,
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
            style={{
              ...SignUpStyle.textInputStyle,
              marginBottom: 0,
              borderColor: focused === "nickname" ? theme.main_blue : "#EDEDED",
            }}
          />
          {!nicknameisValid &&
            nickname.length > 0 &&
            isNextClicked &&
            !isError && (
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: "Pretendard-Medium",
                  fontSize: 12,
                  color: "#F00",
                }}
              >
                중복된 닉네임입니다.
              </Text>
            )}
          <Text
            style={[
              SignUpStyle.subText_black,
              { marginTop: 20, fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            성별
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: 12, marginBottom: 20 }}
          >
            <TouchableOpacity
              onPress={() => {
                setGender("MALE");
                setFocused("gender");
              }}
              style={[
                styles.button,
                gender === "MALE" && { backgroundColor: theme.main_blue },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  gender == "MALE" && {
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
                setGender("FEMALE");
                setFocused("gender");
              }}
              style={[
                styles.button,
                gender === "FEMALE" && { backgroundColor: theme.main_blue },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  gender == "FEMALE" && {
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
              SignUpStyle.subText_black,
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
              ...SignUpStyle.textInputStyle,
              borderColor: focused === "message" ? theme.main_blue : "#EDEDED",
            }}
          />
        </ScrollView>
      </View>

      <SignUpBtn
        nextCondition={nickname && gender && introMessage}
        nextFunction={async () => {
          const isValid = await checkNickname();
          if (isValid) {
            navigation.push("SignUpTerms", {
              nickname: nickname,
              password: password,
              email: email,
              gender: gender,
              introduceMessage: introMessage,
            });
          } else {
            setIsNextClicked(true);
          }
        }}
        backText={"뒤로"}
      />
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
