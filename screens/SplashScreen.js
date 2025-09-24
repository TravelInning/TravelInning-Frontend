import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadProfile } from "../api/mypage/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const boot = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const prof = await loadProfile();
          if (prof?.isSuccess && prof?.result) {
            await AsyncStorage.setItem("userId", String(prof.result.memberId));
            await AsyncStorage.setItem(
              "userName",
              String(prof.result.nickname)
            );
            navigation.reset({ index: 0, routes: [{ name: "Main" }] });
            return;
          }
        } catch (e) {
          await AsyncStorage.multiRemove(["accessToken", "userId", "userName"]);
        }
      }

      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userName");

      if (hasOnboarded === "true") {
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
      }
    };

    const timer = setTimeout(boot, 1500);

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
