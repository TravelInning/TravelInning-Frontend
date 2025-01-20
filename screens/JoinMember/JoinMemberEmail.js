import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 내비게이션 import

const { width, height } = Dimensions.get("window");

export default function JoinMemberEmail() {
  const [email, setEmail] = useState(""); // 이메일 입력 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 입력 상태
  const [isRequestSent, setIsRequestSent] = useState(false); // 인증요청 여부
  const navigation = useNavigation(); // 내비게이션 훅

  const handleEmailChange = (text) => {
    setEmail(text); // 이메일 입력 상태 업데이트
  };

  const handleRequestCode = () => {
    if (email.length > 0) {
      setIsRequestSent(true); // 인증번호 요청 후 상태 변경
      alert("인증번호가 이메일로 발송되었습니다!");
    }
  };

  const handleVerificationCodeChange = (text) => {
    const formattedCode = text.replace(/[^0-9]/g, "").slice(0, 6); // 인증번호는 숫자 6자리 제한
    setVerificationCode(formattedCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{"이메일을\n인증해주세요."}</Text>
        <Text style={styles.subtext}>
          {"로그인 시 사용할\n이메일을 입력해주세요."}
        </Text>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/images/joinmembership/mail.png")}
          style={styles.icon}
        />
      </View>

      {/* Email Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>{"이메일"}</Text>
        <View style={styles.emailContainer}>
          <TextInput
            placeholder={"이메일 입력"}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            style={styles.emailInput}
            editable={!isRequestSent} // 인증요청 후 비활성화
          />
          <TouchableOpacity
            style={[
              styles.requestCodeButton,
              email.length > 0 ? styles.requestCodeButtonActive : null,
            ]}
            onPress={handleRequestCode}
            disabled={email.length === 0}
          >
            <Text
              style={[
                styles.requestCodeText,
                email.length > 0 ? styles.requestCodeTextActive : null,
              ]}
            >
              {isRequestSent ? "재요청" : "인증요청"}
            </Text>
          </TouchableOpacity>
        </View>
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

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            verificationCode.length === 6 ? styles.nextButtonActive : null,
          ]}
          onPress={() => navigation.navigate("JoinMemberProfile")} // 다음 페이지로 이동
          disabled={verificationCode.length !== 6}
        >
          <Text
            style={[
              styles.nextButtonText,
              verificationCode.length === 6 ? styles.nextButtonTextActive : null,
            ]}
          >
            {"다음"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("닫기 클릭!")}>
          <Text style={styles.closeButton}>{"닫기"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginTop: height * 0.05,
    width: width * 0.9,
    alignSelf: "center",
  },
  title: {
    color: "#1B1D28",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
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
    fontWeight: "bold",
    marginBottom: 12,
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
