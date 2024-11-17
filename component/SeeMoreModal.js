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
  buttonPosition = { top: 400 },
}) {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[styles.container, { top: buttonPosition.top, right: 20 }]}
        >
          {/* 확인 버튼 */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Share width={10} height={10} />
            <Text style={styles.text}>공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Reject width={10} height={10} />
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
    width: 165,
    height: 79,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 3,
    padding: 14,
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
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    marginLeft: 5,
    color: "#545454",
  },
});
