import {
  SafeAreaView,
  Keyboard,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "../../colors/color";
import { useEffect, useState } from "react";
import {
  TopLayout,
  JoinMemberStyle,
  JoinMemberBtn,
} from "../../component/JoinMemberComp";

export default function JoinMemberPassword({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
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

  // 6글자 이상 + 숫자&&영문 포함 조건
  const validatePassword = (text) => {
    const hasMinLength = text.length >= 6;
    const hasNumber = /\d/.test(text);
    setIsValid(hasMinLength && hasNumber);
    setPassword(text);
  };

  const correctPassword = (text) => {
    const isMatched = text.length > 0 && password === text;
    setIsCorrect(isMatched);

    if (isMatched) {
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={JoinMemberStyle.subContainer}>
        {!isKeyboardVisible && (
          <TopLayout
            title={"비밀번호를\n입력해주세요."}
            subtext={"잊은 비밀번호는\n이메일로 다시 보내드릴게요."}
            imageSource={require("../../assets/images/joinmembership/password_icon.png")}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              JoinMemberStyle.subText_black,
              { fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            비밀번호
          </Text>
          <TextInput
            placeholder="사용할 비밀번호 입력(영문+숫자 6자 이상)"
            placeholderTextColor={"#919191"}
            onChangeText={validatePassword}
            keyboardType="default"
            autoCapitalize="none"
            style={{
              ...JoinMemberStyle.textInputStyle,
              borderColor: isValid ? theme.main_blue : "#EDEDED",
            }}
          />
          <Text
            style={[
              JoinMemberStyle.subText_black,
              { fontFamily: "Pretendard-SemiBold" },
            ]}
          >
            비밀번호 확인
          </Text>
          <TextInput
            placeholder="비밀번호 다시 입력하여 확인"
            placeholderTextColor={"#919191"}
            onChangeText={correctPassword}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={true}
            style={{
              ...JoinMemberStyle.textInputStyle,
              borderColor: isCorrect ? theme.main_blue : "#EDEDED",
            }}
          />
        </ScrollView>
      </View>
      <JoinMemberBtn
        nextCondition={isValid && isCorrect}
        nextFunction={() =>
          navigation.push("JoinMemberProfile", {
            email: route.params.email,
            password: password,
          })
        }
        backText={"뒤로"}
      />
    </SafeAreaView>
  );
}
