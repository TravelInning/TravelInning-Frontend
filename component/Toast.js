import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { SCREEN_WIDTH, theme } from "../colors/color";

export const showToast = (messsage) => {
  Toast.show({
    type: "success",
    text1: messsage,
    visibilityTime: 2000,
  });
};

// 토스트 메시지 커스텀
export const toastConfig = {
  success: ({ text1 }) => (
    <View style={styles.customToastContainer}>
      <Text style={styles.customToastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  customToastContainer: {
    width: SCREEN_WIDTH - 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.main_blue,
  },
  customToastText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Pretendard-Regular",
    color: theme.main_black,
  },
});
