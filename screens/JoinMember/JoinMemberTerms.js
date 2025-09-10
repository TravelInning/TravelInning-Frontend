import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../colors/color";
import { useEffect, useState } from "react";
import { JoinMemberStyle, JoinMemberBtn } from "../../component/JoinMemberComp";
import { Shadow } from "react-native-shadow-2";
import Check from "../../assets/icon/check_white.svg";
import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";

export default function JoinMemberTerms({ navigation, route }) {
  const [selectedTerms, setSelectedTerms] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isAgreeValid, setIsAgreeValid] = useState(false);
  const termsOfUse = [
    {
      choice: false,
      text: "만 14세 이상입니다.",
      showMore: false,
    },
    {
      choice: false,
      text: "서비스 이용약관 동의",
      showMore: true,
    },
    {
      choice: false,
      text: "개인정보 처리방침 동의",
      showMore: true,
    },
    {
      choice: false,
      text: "개인정보 수집 및 활용 동의",
      showMore: true,
    },
    { choice: true, text: "프로모션 정보 수신 동의", showMore: true },
  ];
  const { nickname, password, email, gender, introduceMessage } = route.params;

  useEffect(() => {
    setIsAgreeValid(agreeCheck());
  }, [selectedTerms]);

  const toggleAgree = (termIndex) => {
    setSelectedTerms((prev) => {
      const newSelected = [...prev];
      newSelected[termIndex] = !newSelected[termIndex];
      return newSelected;
    });
  };

  const agreeCheck = () => {
    const requiredTerms = [0, 1, 2, 3]; // 필수 항목의 인덱스
    return requiredTerms.every((index) => selectedTerms[index]);
  };

  const handleSignUp = async () => {
    try {
      console.log(
        nickname,
        password,
        email,
        gender,
        introduceMessage,
        selectedTerms
      );
      const result = await axios.post(`${API_URL}/api/members/join`, {
        nickname: nickname,
        password: password,
        email: email,
        gender: gender,
        introduceMessage: introduceMessage,
        memberTerm: [true],
      });
      console.log(result.data);
      navigation.navigate("Main");
    } catch (error) {
      console.log("member join error: ", error);
      showToast("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <View style={JoinMemberStyle.subContainer}>
        <Text style={styles.title}>
          {"트래블이닝 사용을 위해\n동의해주세요."}
        </Text>
        <Text style={styles.subtitle}>이용 약관</Text>

        <View>
          {termsOfUse.map((term, index) => (
            <View key={index} style={styles.rowContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => toggleAgree(index)}
                  accessibilityRole="checkbox"
                  accessibilityState={{
                    checked: selectedTerms[index],
                  }}
                >
                  <Shadow
                    distance={2}
                    startColor="rgba(0, 0, 0, 0.1)"
                    finalColor="rgba(0, 0, 0, 0)"
                  >
                    {!selectedTerms[index] ? (
                      <View style={styles.circle} />
                    ) : (
                      <View
                        style={{
                          ...styles.circle,
                          backgroundColor: theme.main_blue,
                        }}
                      >
                        <Check width={12} height={8} />
                      </View>
                    )}
                  </Shadow>
                </TouchableOpacity>
                {!term.choice ? (
                  <Text style={styles.choiceText}>(필수)</Text>
                ) : (
                  <Text
                    style={{
                      ...styles.choiceText,
                      fontFamily: "Pretendard-Regular",
                      color: "#6B6B6B",
                    }}
                  >
                    (선택)
                  </Text>
                )}
                <Text style={styles.termText}>{term.text}</Text>
              </View>
              {term.showMore && (
                <TouchableOpacity>
                  <Text style={styles.showMoreText}>보기</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
      <JoinMemberBtn
        nextCondition={isAgreeValid}
        nextFunction={() => handleSignUp()}
        backText={"닫기"}
        backFunction={() => navigation.navigate("Main")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 28,
    color: theme.main_black,
  },
  subtitle: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#6B6B6B",
    marginTop: 40,
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingRight: 16,
  },
  circle: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  choiceText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 15,
    color: theme.main_blue,
    marginLeft: 12,
    marginRight: 4,
  },
  termText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 15,
    color: "#6B6B6B",
  },
  showMoreText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: "#B8B8B8",
  },
});
