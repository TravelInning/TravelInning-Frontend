import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Header } from "../../../component/Header/Header";
import { theme } from "../../../colors/color";
import { ConfirmBtn } from "../../../component/MyPage/Profile/ConfirmBtn";
import { showToast } from "../../../component/Toast";
import { sendSMScode, verifySMScode } from "../../../api/signup/signup";
// import { updatePhoneNumber } from "../../../api/mypage/profile";

export default function EditPhone({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const onChangePhone = (text) => {
    const formatted = text
      .replace(/[^0-9]/g, "")
      .slice(0, 11)
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, (_m, a, b, c) =>
        [a, b, c].filter(Boolean).join("-")
      );
    setPhoneNumber(formatted);
  };

  const onChangeCode = (text) => {
    setVerificationCode(text.replace(/[^0-9]/g, "").slice(0, 6));
  };

  const requestCode = async () => {
    if (isRequesting) return;
    if (phoneNumber.length !== 13) {
      showToast("전화번호를 정확히 입력해주세요.");
      return;
    }
    setIsRequesting(true);
    const ok = await sendSMScode(phoneNumber);
    if (ok) {
      setIsRequestSent(true);
      showToast("인증번호가 발송되었습니다!");
      Keyboard.dismiss();
    } else {
      showToast("인증번호 요청에 실패했습니다. 다시 시도해주세요.");
    }
    setIsRequesting(false);
  };

  const onSubmit = async () => {
    if (phoneNumber.length !== 13) {
      showToast("전화번호를 입력해주세요.");
      return;
    }
    if (verificationCode.length !== 6) {
      showToast("인증번호 6자리를 입력해주세요.");
      return;
    }

    const ok = await verifySMScode(phoneNumber, verificationCode);
    console.log(ok);
    if (ok) {
      showToast("인증이 완료되었습니다.");
      // const result = await updatePhoneNumber(phoneNumber);
      // if (result) {
      //   showToast("전화번호가 변경되었습니다.");
      //   navigation.goBack();
      // } else {
      //   showToast("변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
      // }
    } else {
      showToast("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <Header title="전화번호 변경" />
      <View style={styles.body}>
        {/* 전화번호 입력 + 인증요청 */}
        <Shadow
          distance={2}
          startColor="rgba(0,0,0,0.1)"
          finalColor="rgba(0,0,0,0)"
          style={{ width: "100%", marginBottom: 16 }}
        >
          <View style={styles.row}>
            <TextInput
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChangeText={onChangePhone}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={requestCode}
              disabled={isRequesting || phoneNumber.length !== 13}
              style={[
                styles.sideBtn,
                phoneNumber.length === 13 && styles.sideBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.sideBtnText,
                  phoneNumber.length === 13 && styles.sideBtnTextActive,
                ]}
              >
                {isRequestSent ? "재요청" : "인증요청"}
              </Text>
            </TouchableOpacity>
          </View>
        </Shadow>

        {/* 인증번호 입력 (요청 후 노출) */}
        {isRequestSent && (
          <Shadow
            distance={2}
            startColor="rgba(0,0,0,0.1)"
            finalColor="rgba(0,0,0,0)"
            style={{ width: "100%" }}
          >
            <View style={styles.row}>
              <TextInput
                placeholder="문자로 전송된 인증번호를 입력해주세요."
                value={verificationCode}
                onChangeText={onChangeCode}
                keyboardType="number-pad"
                style={[styles.input, styles.verifyInput]}
              />
            </View>
          </Shadow>
        )}
      </View>
      <ConfirmBtn confirmFunc={onSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 30,
  },
  row: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    overflow: "hidden",
    paddingLeft: 14,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: theme.main_black,
  },
  sideBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#D6D6D6",
  },
  sideBtnActive: { backgroundColor: theme.main_blue },
  sideBtnText: {
    color: "#919191",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
  },
  sideBtnTextActive: { color: "#FFFFFF" },
  verifyInput: {
    fontFamily: "Pretendard-Regular",
  },
});
