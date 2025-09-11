import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { SCREEN_HEIGHT, theme } from "../../colors/color";
import { login } from "../../api/login/login";

export default function LoginScreen({ navigation }) {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    const isValid = await login(idInput, passwordInput);
    if (isValid) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  };

  return (
    <SafeAreaView style={[theme.container, styles.container]}>
      <View>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/login/test.png")}
            resizeMode={"contain"}
            style={styles.logo}
          />
          <Text style={styles.subtitle}>{"야구보고 어디가닝"}</Text>
          <Text style={styles.title}>{"트래블이닝"}</Text>
        </View>
        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"아이디 입력"}
            value={idInput}
            onChangeText={setIdInput}
            style={styles.textInput}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder={"비밀번호 입력"}
              value={passwordInput}
              onChangeText={setPasswordInput}
              secureTextEntry={!isPasswordVisible}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={require("../../assets/images/login/test.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={styles.loginButtonText}>{"로그인"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FindEmail")}
          style={styles.findContainer}
        >
          <Text style={styles.findText}>{"아이디 찾기"}</Text>

          <Text style={styles.divider}>{"|"}</Text>
          <Text style={styles.findText}>{"비밀번호 찾기"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          {"아직 트래블이닝 회원이 아니신가요?"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpPhoneNumber");
          }}
        >
          <Text style={styles.signupButton}>{"회원가입"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
    paddingHorizontal: 30,
    paddingBottom: SCREEN_HEIGHT / 6,
    paddingTop: Math.min(72, SCREEN_HEIGHT / 8),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT / 20,
  },
  logo: {
    height: 34,
    width: 34,
    marginBottom: 13,
  },
  subtitle: {
    color: "#5F5F5F",
    fontSize: 10,
    fontFamily: "Pretendard-Medium",
    marginBottom: 4,
    textAlign: "center",
  },
  title: {
    color: "#0083FF",
    fontSize: 40,
    fontFamily: "Pretendard-ExtraBold",
    textAlign: "center",
  },
  textInput: {
    color: "#000",
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard-Regular",
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
    fontSize: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontFamily: "Pretendard-Regular",
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#0083FF",
    borderRadius: 5,
    paddingVertical: 16,
    marginBottom: 23,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  findContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  findText: {
    color: "#626262",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
  },
  divider: {
    color: "#626262",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#626262",
    fontSize: 12,
  },
  signupButton: {
    color: "#0083FF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
