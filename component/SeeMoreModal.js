import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Reject from "../assets/icon/seemore/reject.svg";
import Share from "../assets/icon/seemore/share.svg";
import Change from "../assets/icon/seemore/change.svg";
import Reset from "../assets/icon/mypage/reset.svg";

const icons = {
  share: <Share width={12} height={12} />,
  change: <Change width={11} height={12} />,
  reject: <Reject width={10} height={10} />,
  reset: <Reset width={12} height={12} />,
};

export default function SeeMoreModal({
  visible,
  onClose,
  buttonPosition = { top: 400 },
  options,
}) {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[styles.container, { top: buttonPosition.top + 4, right: 24 }]}
        >
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.rowContainer}
              onPress={() => {
                onClose();
                opt.onPress();
              }}
            >
              {icons[opt.type]}
              <Text style={{ ...styles.text, color: opt.color || "#545454" }}>
                {opt.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 165,
    gap: 12,
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
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
