import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadProfile } from "../api/mypage/profile/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await loadProfile();
        if (data?.isSuccess && data?.result?.memberId != null) {
          await AsyncStorage.setItem("userId", String(data.result.memberId));
          navigation.reset({ index: 0, routes: [{ name: "Main" }] });
        } else {
          await AsyncStorage.removeItem("userId");
          navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
        }
      } catch (e) {
        await AsyncStorage.removeItem("userId");
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 1800);

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
