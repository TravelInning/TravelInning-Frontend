import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { theme } from "../colors/color";

export default function CancleConfirmModal({
  visible,
  onClose,
  text,
  onClick,
}) {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: 96,
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderColor: "#EDEDED",
            }}
          >
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.btnContainer,
                { borderRightWidth: 1, borderColor: "#EDEDED" },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Pretendard-Medium",
                  color: "#2A2A2A",
                }}
              >
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onClick={onClick} style={styles.btnContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Pretendard-SemiBold",
                  color: theme.main_blue,
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 152,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: "#000",
    textAlign: "center",
    lineHeight: 22,
  },
  btnContainer: {
    flex: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
