import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../../colors/color";

export default function EditIntroduce({ value, onChange, maxLength = 50 }) {
  const length = value?.length ?? 0;

  return (
    <View style={styles.container}>
      <Shadow
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        finalColor="rgba(0, 0, 0, 0)"
        style={{ width: "100%" }}
      >
        <View style={[styles.editInput, { paddingTop: 10 }]}>
          <TextInput
            placeholder="소개 메시지 입력"
            value={value}
            onChangeText={onChange}
            style={styles.textarea}
            multiline
            textAlignVertical="top"
            maxLength={maxLength}
          />
          <Text style={styles.limit}>
            <Text style={{ color: theme.main_black }}>{length}</Text> |{" "}
            {maxLength}
          </Text>
        </View>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 23, paddingVertical: 30 },
  editInput: {
    backgroundColor: "#fff",
    borderRadius: 9,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textarea: {
    height: 100,
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: theme.main_black,
    marginBottom: 10,
  },
  limit: {
    textAlign: "right",
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#C2C2C2",
  },
});
