import React, { useRef, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import { theme } from "../colors/color";

const FilterModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{ width: "100%", transform: [{ translateY: slideAnim }] }}
            >
              <View style={styles.modal}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.modalText}>스크랩한 장소만 보기</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.modalText}>스크랩한 장소만 보기</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{ ...styles.modalText, color: theme.main_blue }}>
                    스크랩한 장소만 보기
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 55,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderRadius: 9,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity onPress={onClose}>
                  <Text style={{ ...styles.modalText, color: "#f00" }}>
                    취소
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#00000090",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modal: {
    width: "100%",
    height: 183,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 9,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Pretendard-Regular",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#EDEDED",
  },
});

export default FilterModal;
