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

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/login/test.png")}
          resizeMode={"stretch"}
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
              source={require("../assets/images/login/test.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => alert("로그인 버튼 클릭!")}>
          <Text style={styles.loginButtonText}>{"로그인"}</Text>
        </TouchableOpacity>
      </View>

      {/* Find ID/Password Section */}
      <View style={styles.findContainer}>
        <TouchableOpacity>
          <Text style={styles.findText}>{"아이디 찾기"}</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>{"|"}</Text>
        <TouchableOpacity>
          <Text style={styles.findText}>{"비밀번호 찾기"}</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{"또는"}</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Login Section */}
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/login/test.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/login/test.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign-Up Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{"아직 트래블이닝 회원이 아니신가요?"}</Text>
        <TouchableOpacity>
          <Text style={styles.signupButton}>{"회원가입"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.05,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    height: 34.84,
    width: 34.84,
    marginBottom: 17,
  },
  subtitle: {
    color: "#5F5F5F",
    fontSize: 10,
    fontFamily: "Pretendard-Medium",
    marginBottom: 9,
    textAlign: "center",
  },
  title: {
    color: "#0083FF",
    fontSize: 40,
    fontFamily: "Pretendard-ExtraBold",
    textAlign: "center",
  },
  inputContainer: {
    width: width * 0.85,
  },
  textInput: {
    color: "#000",
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard-Regular",
    borderRadius: 5,
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard-Regular",
    borderRadius: 5,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
    fontSize: 14,
    paddingVertical: 19,
    paddingHorizontal: 22,
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
    paddingVertical: 20,
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
    marginBottom: 36,
  },
  findText: {
    color: "#626262",
    fontSize: 14,
    fontWeight: "bold",
  },
  divider: {
    color: "#626262",
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
    width: width * 0.85,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#BBBBBB",
    flex: 1,
  },
  dividerText: {
    color: "#BBBBBB",
    fontSize: 13,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 64,
  },
  socialIcon: {
    width: 49,
    height: 49,
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
