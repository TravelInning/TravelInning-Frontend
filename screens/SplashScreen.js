import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!accessToken || !refreshToken) {
          // 토큰 없음 → 로그인 화면으로
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
          return;
        }

        // 1. access token 검증 요청
        const res = await fetch("http://your-api.com/auth/validate", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.ok) {
          // 유효하면 메인 화면으로
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } else {
          // access token 만료 → refresh 요청
          const refreshRes = await fetch("http://your-api.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            await AsyncStorage.setItem("accessToken", data.accessToken);
            navigation.reset({
              index: 0,
              routes: [{ name: "Main" }],
            });
          } else {
            // refresh 실패 → 로그인 화면으로
            await AsyncStorage.removeItem("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          }
        }
      } catch (err) {
        console.log("Auth check error:", err);
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/splash/splash_bg.png")}
        style={styles.background}
      >
        <Image
          source={require("../assets/images/splash/logo.png")}
          style={styles.logo}
        />
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 50 }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBEEFF",
    paddingTop: 40,
  },
  background: {
    width: "100%",
    height: 400,
  },
  logo: {
    width: "50%",
    resizeMode: "contain",
    position: "absolute",
    top: "50%",
    right: 10,
  },
});

export default SplashScreen;
