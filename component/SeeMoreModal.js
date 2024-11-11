import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Reject from "../assets/icon/reject.svg";
import Share from "../assets/icon/share.svg";

export default function SeeMoreModal({
  visible,
  onClose,
  buttonPosition = { top: 317 },
}) {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[styles.container, { top: buttonPosition.top + 8, right: 20 }]}
        >
          {/* 확인 버튼 */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Share width={8} height={8} />
            <Text style={styles.text}>공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Reject width={8} height={8} />
            <Text style={{ ...styles.text, color: "#f00" }}>
              더 이상 추천받지 않음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 116,
    height: 54,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 9,
    padding: 9,
    borderWidth: 1,
    borderColor: "#EDEDED",
    position: "absolute",
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 10,
    fontFamily: "Pretendard-Regular",
    marginLeft: 3,
    color: "#545454",
  },
});
