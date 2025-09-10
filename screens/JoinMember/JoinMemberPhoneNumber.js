import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 내비게이션 import
import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";
import { theme } from "../../colors/color";
import { JoinMemberBtn } from "../../component/JoinMemberComp";

const { width, height } = Dimensions.get("window");

export default function JoinMemberPhoneNumber() {
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

  const handleRequestCode = async () => {
    if (isRequesting || phoneNumber.length !== 13) return; // 연속 요청 방지
    setIsRequesting(true);

    const isSuccess = await sendSMScode();
    if (isSuccess) {
      setIsRequestSent(true);
      showToast("인증번호가 발송되었습니다!");
    } else {
      showToast("인증번호 요청에 실패했습니다. 다시 시도해주세요.");
    }

    setIsRequesting(false);
  };

  const handleVerificationCodeChange = (text) => {
    const formattedCode = text.replace(/[^0-9]/g, "").slice(0, 6);
    setVerificationCode(formattedCode);
  };

  // SMS request
  const sendSMScode = async () => {
    try {
      console.log(`${API_URL}`);
      console.log(
        `${API_URL}/api/members/sms/auth`,
        " phoneNumber: ",
        phoneNumber.replace(/-/g, "")
      );
      await axios.post(
        `https://travelinning.store/api/members/sms/auth`,
        {
          phoneNumber: phoneNumber.replace(/-/g, ""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      console.log("send SMScode error: ", error);
      return false;
    }
  };

  // SMS code verify
  const verifySMScode = async () => {
    try {
      console.log(
        API_URL,
        phoneNumber.replace(/-/g, ""),
        String(verificationCode)
      );
      const response = await axios.post(
        `${API_URL}/api/members/sms/auth/verify`,
        {
          phoneNumber: phoneNumber.replace(/-/g, ""),
          code: verificationCode.toString(),
        }
      );
      console.log("response ", response.data);
      return response.data?.isSuccess || false;
    } catch (error) {
      console.log("verify SMScode error: ", error);
      return false;
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      {/* Header Section */}
      {!isKeyboardVisible && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>{"전화번호를\n인증해주세요."}</Text>
            <Text style={styles.subtext}>
              {"한 번의 인증으로\n트래블이닝을 안전하게 이용해보세요."}
            </Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/images/joinmembership/phone.png")}
              style={styles.icon}
            />
          </View>
        </>
      )}
      <View style={{ flex: 1 }}>
        {/* Phone Number Input Section */}
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

        {/* Verification Code Input Section */}
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
      {/* Footer Section */}
      <JoinMemberBtn
        nextCondition={verificationCode.length === 6}
        nextFunction={async () => {
          const isSuccess = await verifySMScode();
          if (isSuccess) {
            navigation.navigate("JoinMemberEmail");
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
  header: {
    marginTop: height * 0.05,
    width: width * 0.9,
    alignSelf: "center",
  },
  title: {
    color: "#1B1D28",
    fontSize: 28,
    marginBottom: 12,
    fontFamily: "Pretendard-ExtraBold",
  },
  subtext: {
    color: "#909090",
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
  },
  icon: {
    height: 79,
    width: 79,
  },
  inputSection: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.05,
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
    width: width * 0.9,
    alignSelf: "center",
    marginBottom: height * 0.05,
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
  footer: {
    position: "absolute",
    bottom: 0,
    width: width,
    alignItems: "center",
    paddingVertical: height * 0.03,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#ECECEC",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 9,
    paddingVertical: 19,
    width: width * 0.9,
  },
  nextButtonActive: {
    backgroundColor: "#0083FF",
  },
  nextButtonText: {
    color: "#B8B8B8",
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
  },
  nextButtonTextActive: {
    color: "#FFFFFF",
  },
  closeButton: {
    color: "#0083FF",
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    marginTop: 10,
  },
});
