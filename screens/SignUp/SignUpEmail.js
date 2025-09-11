import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../component/Toast";
import { theme } from "../../colors/color";
import { SignUpBtn } from "../../component/SignUpComp";
import {
  checkEmail,
  sendEmailCode,
  verifyEmailCode,
} from "../../api/signup/signup";
import { TopLayout } from "../../component/SignUpComp";
import { SignUpStyle } from "../../component/SignUpComp";

export default function SignUpEmail() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigation = useNavigation(); // 내비게이션 훅
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

  const handleEmailChange = (text) => {
    setEmail(text);

    validateEmailFormat(text) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleVerificationCodeChange = (text) => {
    const formattedCode = text.replace(/[^0-9]/g, "").slice(0, 6); // 인증번호는 숫자 6자리 제한
    setVerificationCode(formattedCode);
  };

  const handleRequestCode = async () => {
    if (isRequesting || email.length <= 0) return; // 연속 요청 방지
    setIsRequesting(true);

    const isDuplicated = await checkEmail(email);
    setIsEmailDuplicated(isDuplicated);
    if (isDuplicated) {
      setIsRequesting(false);
      return;
    }

    const isSuccess = await sendEmailCode(email);
    if (isSuccess) {
      setIsRequestSent(true);
      showToast("인증번호가 이메일로 발송되었습니다!");
    }

    setIsRequesting(false);
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={SignUpStyle.subContainer}>
        {!isKeyboardVisible && (
          <TopLayout
            title={"이메일을\n입력해주세요."}
            subtext={"로그인 시 사용할\n이메일을 입력해주세요."}
            imageSource={require("../../assets/images/signup/mail.png")}
          />
        )}
        <View style={{ flex: 1 }}>
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{"이메일"}</Text>
            <View style={styles.emailContainer}>
              <TextInput
                placeholder={"이메일 입력"}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                style={styles.emailInput}
              />
              <TouchableOpacity
                style={[
                  styles.requestCodeButton,
                  isValidEmail ? styles.requestCodeButtonActive : null,
                ]}
                onPress={async () => {
                  await handleRequestCode();
                }}
                disabled={!isValidEmail}
              >
                <Text
                  style={[
                    styles.requestCodeText,
                    isValidEmail ? styles.requestCodeTextActive : null,
                  ]}
                >
                  {isRequestSent ? "재요청" : "인증요청"}
                </Text>
              </TouchableOpacity>
            </View>
            {email && isEmailDuplicated && (
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: "Pretendard-Medium",
                  fontSize: 12,
                  color: "#F00",
                }}
              >
                이미 가입된 이메일입니다.
              </Text>
            )}
          </View>
          {/* Verification Code Input Section */}
          {isRequestSent && (
            <View style={styles.verificationSection}>
              <Text style={styles.inputLabel}>{"인증번호"}</Text>
              <TextInput
                placeholder={"이메일로 전송된 인증번호를 입력해주세요."}
                value={verificationCode}
                onChangeText={handleVerificationCodeChange}
                keyboardType="number-pad"
                style={styles.verificationInput}
              />
            </View>
          )}
        </View>
      </View>
      {/* Footer Section */}
      <SignUpBtn
        nextCondition={verificationCode.length === 6}
        nextFunction={async () => {
          const isVaild = await verifyEmailCode(email, verificationCode);
          if (isVaild) {
            navigation.navigate("SignUpPassword", { email: email });
          }
        }}
        backText={"뒤로"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    width: "100%",
    alignSelf: "center",
  },
  inputLabel: {
    color: "#1B1D28",
    fontSize: 16,
    marginBottom: 12,
    fontFamily: "Pretendard-SemiBold",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#ECECEC",
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
    color: "#909090",
    fontSize: 16,
    paddingVertical: 10,
  },
  requestCodeButton: {
    width: 95,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderColor: "#ECECEC",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 6,
  },
  requestCodeButtonActive: {
    backgroundColor: "#0083FF",
    borderColor: "#0083FF",
  },
  requestCodeText: {
    color: "#B8B8B8",
    fontSize: 14,
  },
  requestCodeTextActive: {
    color: "#FFFFFF",
  },
  verificationSection: {
    width: "100%",
    alignSelf: "center",
  },
  verificationInput: {
    color: "#909090",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: "#ECECEC",
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },
});
