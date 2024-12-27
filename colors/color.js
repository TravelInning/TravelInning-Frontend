import { Platform, StatusBar, Dimensions } from "react-native";

export const theme = {
  main_blue: "#0084FF",
  main_black: "#1B1D28",
  gray: "#9C9C9C",

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
};

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
