import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../colors/color";
import { SignUpBtn } from "../../component/SignUpComp";
import { checkEmail } from "../../api/signup/signup";
import { TopLayout } from "../../component/SignUpComp";
import { SignUpStyle } from "../../component/SignUpComp";

export default function FindEmailScreen() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigation = useNavigation();
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

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    const isValid = validateEmailFormat(text);
    setIsValidEmail(isValid);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // 0.3초 뒤에 중복검사 실행
    if (isValid) {
      const timeout = setTimeout(async () => {
        const isDuplicated = await checkEmail(text);
        setIsEmailDuplicated(isDuplicated);
      }, 300);
      setTypingTimeout(timeout);
    } else {
      setIsEmailDuplicated(false);
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={SignUpStyle.subContainer}>
        {!isKeyboardVisible && (
          <TopLayout
            title={"이메일을\n입력해주세요."}
            subtext={"비밀번호를 변경할\n이메일을 입력해주세요."}
            imageSource={require("../../assets/images/signup/mail.png")}
          />
        )}
        <Text
          style={[
            SignUpStyle.subText_black,
            { fontFamily: "Pretendard-SemiBold" },
          ]}
        >
          이메일
        </Text>
        <TextInput
          placeholder={"이메일 입력"}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          style={{
            ...SignUpStyle.textInputStyle,
            marginBottom: 0,
            borderColor: isEmailDuplicated ? theme.main_blue : "#EDEDED",
          }}
        />
        {email && !isValidEmail && (
          <Text
            style={{
              marginTop: 4,
              fontFamily: "Pretendard-Medium",
              fontSize: 12,
              color: "#F00",
            }}
          >
            이메일 형식이 올바르지 않습니다.
          </Text>
        )}
        {email && isValidEmail && !isEmailDuplicated && (
          <Text
            style={{
              marginTop: 4,
              fontFamily: "Pretendard-Medium",
              fontSize: 12,
              color: "#F00",
            }}
          >
            가입되지 않은 이메일입니다.
          </Text>
        )}
      </View>

      {/* Footer Section */}
      <SignUpBtn
        nextCondition={isEmailDuplicated}
        nextFunction={async () => {
          navigation.navigate("FindPassword", { email: email });
        }}
        backText={"뒤로"}
      />
    </SafeAreaView>
  );
}
