import { StyleSheet, Text, Pressable, View } from "react-native";
import { theme } from "../../colors/color";
import Pen from "../../assets/icon/companion/pen.svg";
import Done from "../../assets/icon/companion/done.svg";
import InProgress from "../../assets/icon/companion/inprogress.svg";

export const WriteButton = ({ onClick }) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.writeButton,
        { backgroundColor: pressed ? theme.gray50 : "#FFF" },
      ]}
    >
      <Pen />
      <Text style={styles.buttonText}>작성하기</Text>
    </Pressable>
  );
};

export const Chip = ({ isDone }) => {
  return (
    <View
      style={[
        styles.chipContainer,
        isDone === "FOUND" && { backgroundColor: "#545454" },
      ]}
    >
      {isDone === "FOUND" ? (
        <Done width={7} height={7} />
      ) : (
        <InProgress width={8} height={8} />
      )}
      <Text style={styles.chipText}>
        {isDone === "FOUND" ? "구했어요" : "구하는중"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  writeButton: {
    flexDirection: "row",
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -60 }],
    borderWidth: 1,
    borderColor: theme.borderColor,

    // android shadow
    elevation: 2,
    // ios shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: theme.main_black,
    marginLeft: 6,
  },

  // chip
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    backgroundColor: theme.main_blue,
  },
  chipText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 8,
    color: "#FFF",
    marginLeft: 2,
  },
});
