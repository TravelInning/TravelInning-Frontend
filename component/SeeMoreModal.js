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
import { theme } from "../colors/color";

export default function SeeMoreModal({
  visible,
  onClose,
  buttonPosition = { top: 400 },
  from = "home",
  setDeleteModalVisible,
}) {
  // 나중에 작성자인지 아닌지 확인하는 코드 넣기
  // 그에 따라 버튼 내용과 동작이 달라짐
  const isWriter = "true";

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[styles.container, { top: buttonPosition.top + 4, right: 20 }]}
        >
          {/* share */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Share width={12} height={12} />
            <Text style={styles.text}>공유하기</Text>
          </TouchableOpacity>
          {/* changeState - gowith,writer */}
          {from === "gowith" && isWriter && (
            <TouchableOpacity
              style={{ ...styles.rowContainer, marginVertical: 10 }}
            >
              <Change width={11} height={12} />
              <Text style={{ ...styles.text, color: theme.main_blue }}>
                상태 변경하기
              </Text>
            </TouchableOpacity>
          )}
          {/* reject */}
          {from === "home" ? (
            <TouchableOpacity style={styles.rowContainer}>
              <Reject width={10} height={10} />
              <Text style={{ ...styles.text, color: "#f00" }}>
                더 이상 추천받지 않음
              </Text>
            </TouchableOpacity>
          ) : isWriter ? (
            <TouchableOpacity
              onPress={() => {
                onClose();
                setDeleteModalVisible(true);
              }}
              style={styles.rowContainer}
            >
              <Reject width={10} height={10} />
              <Text style={{ ...styles.text, color: "#f00" }}>삭제하기</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.rowContainer}>
              <Reject width={10} height={10} />
              <Text style={{ ...styles.text, color: "#f00" }}>
                이 게시글 차단하기
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 165,
    minHeight: 79,
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
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
