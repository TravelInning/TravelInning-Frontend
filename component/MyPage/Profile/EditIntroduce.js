import { StyleSheet, Text, TextInput, View } from "react-native";
import { ConfirmBtn } from "./ConfirmBtn";
import { useState } from "react";
import { mypage } from "./style";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../../colors/color";

export default function EditIntroduce() {
  const [introduce, setIntroduce] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Shadow
          distance={2}
          startColor="rgba(0, 0, 0, 0.1)"
          finalColor="rgba(0, 0, 0, 0)"
          style={{ width: "100%" }}
        >
          <View style={[mypage.editInput, { paddingTop: 10 }]}>
            <TextInput
              placeholder={"소개 메시지 입력"}
              value={introduce}
              onChangeText={setIntroduce}
              style={styles.textarea}
              multiline={true}
              textAlignVertical="top"
              maxLength={50}
            />
            <Text style={styles.limit}>
              <Text style={{ color: theme.main_black }}>
                {introduce.length}
              </Text>{" "}
              | 50
            </Text>
          </View>
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
