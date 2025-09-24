import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ConfirmBtn } from "./ConfirmBtn";
import { useState } from "react";
import { mypage } from "./style";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../../colors/color";

const genderMap = {
  MALE: "남성",
  FEMALE: "여성",
};

export default function EditGender() {
  const [gender, setGender] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Shadow
          distance={2}
          startColor="rgba(0, 0, 0, 0.1)"
          finalColor="rgba(0, 0, 0, 0)"
          style={{ width: "100%" }}
        >
          <View style={mypage.editInput}>
            <Text style={styles.text}>{genderMap[gender]}</Text>
          </View>
        </Shadow>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => setGender("MALE")}
            style={[styles.button, gender === "MALE" && styles.button_active]}
          >
            <Text style={styles.text}>남성</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("FEMALE")}
            style={[styles.button, gender === "FEMALE" && styles.button_active]}
          >
            <Text style={styles.text}>여성</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmBtn />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 23,
    paddingVertical: 30,
  },
  btnGroup: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 9,
    color: theme.main_black,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  button_active: {
    backgroundColor: "#F4F4F4",
  },
  text: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: theme.main_black,
  },
});
