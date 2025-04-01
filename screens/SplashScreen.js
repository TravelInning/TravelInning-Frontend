import { Image, ImageBackground, SafeAreaView, StyleSheet } from "react-native";

const SplashScreen = () => {
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
