import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { theme } from "../colors/color";

// 디바이스에 따라 메인 마진값 조절
const SCREEN_HEIGHT = Dimensions.get("window").height;
const MARGIN = SCREEN_HEIGHT / 20;

export default function BottomBtn({ text, onPress, isDisabled }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={isDisabled}
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.button, isDisabled && { backgroundColor: "#F3F3F3" }]}
      >
        <Text style={[styles.buttonText, isDisabled && { color: "#B8B8B8" }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: MARGIN,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    borderRadius: 9,
    backgroundColor: theme.main_blue,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
    color: "white",
  },
});
