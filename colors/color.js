import { Platform, StatusBar, Dimensions } from "react-native";

export const theme = {
  main_blue: "#0084FF",
  main_black: "#1B1D28",
  gray: "#9C9C9C",
  gray50: "#F7F8FA",
  borderColor: "#F4F4F4",

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
};

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
