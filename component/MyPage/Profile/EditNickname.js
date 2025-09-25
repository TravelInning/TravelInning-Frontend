import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { mypage } from "./style";

export default function EditNickname({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Shadow
        distance={2}
        startColor="rgba(0, 0, 0, 0.1)"
        finalColor="rgba(0, 0, 0, 0)"
        style={{ width: "100%" }}
      >
        <TextInput
          placeholder="닉네임 입력"
          value={value}
          onChangeText={onChange}
          style={mypage.editInput}
        />
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 23, paddingVertical: 30 },
});
