import { Platform, StatusBar, Dimensions } from "react-native";

export const theme = {
  main_blue: "#0084FF",
  main_black: "#1B1D28",
  gray: "#9C9C9C",
  gray50: "#F7F8FA",
  gray100: "#f2f3f6",
  gray200: "#eaebee",
  gray300: "#dcdee3",
  gray400: "#d1d3d8",
  gray500: "#9C9C9C",
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
  header: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
  },
};

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
