import { StyleSheet, TextInput, View } from "react-native";
import { ConfirmBtn } from "./ConfirmBtn";
import { useState } from "react";
import { mypage } from "../../../styles/mypage/mypage";
import { Shadow } from "react-native-shadow-2";

export default function EditNickname() {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Shadow
          distance={2}
          startColor="rgba(0, 0, 0, 0.1)"
          finalColor="rgba(0, 0, 0, 0)"
          style={{ width: "100%" }}
        >
          <TextInput
            placeholder={"닉네임 입력"}
            value={nickname}
            onChangeText={setNickname}
            style={mypage.editInput}
          />
        </Shadow>
      </View>
      <ConfirmBtn />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 30,
  },
});
