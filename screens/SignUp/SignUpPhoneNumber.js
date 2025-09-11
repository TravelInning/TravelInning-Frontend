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
import { sendSMScode, verifySMScode } from "../../api/signup/signup";
import { TopLayout } from "../../component/SignUpComp";
import { SignUpStyle } from "../../component/SignUpComp";

export default function SignUpPhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
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

  const handlePhoneNumberChange = (text) => {
    const formattedText = text
      .replace(/[^0-9]/g, "")
      .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      .slice(0, 13);
    setPhoneNumber(formattedText);
  };

  const handleVerificationCodeChange = (text) => {
    const formattedCode = text.replace(/[^0-9]/g, "").slice(0, 6);
    setVerificationCode(formattedCode);
  };

  const handleRequestCode = async () => {
    if (isRequesting || phoneNumber.length !== 13) return; // 연속 요청 방지
    setIsRequesting(true);

    const isSuccess = await sendSMScode(phoneNumber);
    if (isSuccess) {
      setIsRequestSent(true);
      showToast("인증번호가 발송되었습니다!");
    } else {
      showToast("인증번호 요청에 실패했습니다. 다시 시도해주세요.");
    }

    setIsRequesting(false);
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={SignUpStyle.subContainer}>
        {!isKeyboardVisible && (
          <TopLayout
            title={"전화번호를\n인증해주세요."}
            subtext={"한 번의 인증으로\n트래블이닝을 안전하게 이용해보세요."}
            imageSource={require("../../assets/images/signup/phone.png")}
          />
        )}
        <View style={{ flex: 1 }}>
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{"전화번호"}</Text>
            <View style={styles.phoneNumberContainer}>
              <TextInput
                placeholder={"전화번호 입력"}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="number-pad"
                style={styles.phoneNumberInput}
                editable={!isRequestSent}
              />
              <TouchableOpacity
                style={[
                  styles.requestCodeButton,
                  phoneNumber.length === 13
                    ? styles.requestCodeButtonActive
                    : null,
                ]}
                onPress={handleRequestCode}
                disabled={phoneNumber.length !== 13}
              >
                <Text
                  style={[
                    styles.requestCodeText,
                    phoneNumber.length === 13
                      ? styles.requestCodeTextActive
                      : null,
                  ]}
                >
                  {isRequestSent ? "재요청" : "인증번호 요청"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isRequestSent && (
            <View style={styles.verificationSection}>
              <Text style={styles.inputLabel}>{"인증번호"}</Text>
              <TextInput
                placeholder={"문자로 전송된 인증번호를 입력해주세요."}
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
          const isSuccess = await verifySMScode(phoneNumber, verificationCode);
          if (isSuccess) {
            navigation.navigate("SignUpEmail");
          } else {
            showToast("인증번호를 확인해주세요.");
          }
        }}
        backText={"닫기"}
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
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#ECECEC",
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  phoneNumberInput: {
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
