import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { theme } from "../colors/color";

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
    bottom: 50,
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
