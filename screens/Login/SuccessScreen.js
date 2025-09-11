import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../../colors/color";
import { SignUpBtn, SignUpStyle } from "../../component/SignUpComp";

export default function SuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <View style={SignUpStyle.subContainer}>
        <Text style={styles.title}>
          {"새로운 비밀번호로\n변경 완료되었습니다."}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <Image
            source={require("../../assets/images/login/password_success.png")}
            style={{
              width: 79,
              height: 79,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
      <SignUpBtn
        nextCondition={true}
        nextFunction={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          })
        }
        nextText="확인"
        backFunction={() => {}}
        backText={""}
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
});
