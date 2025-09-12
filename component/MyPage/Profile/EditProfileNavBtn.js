import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import RightArrow from "../../../assets/icon/mypage/right_arrow_gray.svg";
import { theme } from "../../../colors/color";

export const EditProfileNavBtn = ({ title, content, navFunc }) => {
  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ width: "100%" }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={navFunc}
        style={styles.buttonBox}
      >
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <RightArrow />
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 25,
    backgroundColor: "#F4F4F4",
    borderRadius: 9,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  textBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Pretendard-Regular",
    fontSize: 18,
    color: theme.main_black,
  },
  content: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: theme.main_black,
  },
});
