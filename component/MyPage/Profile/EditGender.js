import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../../colors/color";

const genderMap = { MALE: "남성", FEMALE: "여성" };

export default function EditGender({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Shadow
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        finalColor="rgba(0, 0, 0, 0)"
        style={{ width: "100%" }}
      >
        <View style={styles.editInput}>
          <Text style={styles.text}>
            {value ? genderMap[value] : "성별을 선택하세요"}
          </Text>
        </View>
      </Shadow>

      <View style={styles.btnGroup}>
        <TouchableOpacity
          onPress={() => onChange("MALE")}
          style={[styles.button, value === "MALE" && styles.button_active]}
        >
          <Text style={styles.text}>남성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange("FEMALE")}
          style={[styles.button, value === "FEMALE" && styles.button_active]}
        >
          <Text style={styles.text}>여성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, paddingHorizontal: 23, paddingVertical: 30 },
  editInput: {
    backgroundColor: "#fff",
    borderRadius: 9,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  btnGroup: { flexDirection: "row", gap: 15 },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  button_active: { backgroundColor: "#F4F4F4" },
  text: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: theme.main_black,
  },
});
