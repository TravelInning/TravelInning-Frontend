import { StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../../colors/color";
import { SignUpBtn, SignUpStyle } from "../../component/SignUpComp";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
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
        nextFunction={async () => {
          await AsyncStorage.multiRemove(["accessToken", "userId", "userName"]);
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        }}
        nextText="확인"
        backFunction={() => {}}
        backText={""}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 28,
    color: theme.main_black,
  },
});
