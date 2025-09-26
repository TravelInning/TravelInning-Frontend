import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import { theme, SCREEN_HEIGHT } from "../colors/color";
import Check from "../assets/icon/check_blue.svg";

const CheckFilterModal = ({
  visible,
  onClose,
  keywordArry,
  currentKeyword,
  setSelected,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [selectedKeyword, setSelectedKeyword] = useState("");

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

  useEffect(() => {
    if (visible) {
      if (keywordArry.includes(currentKeyword)) {
        setSelectedKeyword(currentKeyword);
      } else {
        setSelectedKeyword("");
      }
    }
  }, [visible, currentKeyword, keywordArry]);

  const toggleKeyword = (keyword) => {
    setSelectedKeyword((prevSelected) =>
      prevSelected === keyword ? prevSelected === "" : keyword
    );
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{ width: "100%", transform: [{ translateY: slideAnim }] }}
            >
              <View style={styles.bar} />

              {/* Keyword Filter */}
              <View style={styles.modal}>
                {keywordArry.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => toggleKeyword(item)}
                      style={styles.keywordTouchContainer}
                    >
                      {selectedKeyword === item ? (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={[
                              styles.modalText,
                              {
                                color: theme.main_blue,
                                fontFamily: "Pretendard-Medium",
                              },
                            ]}
                          >
                            {item}
                          </Text>
                          <View
                            style={[
                              styles.checkSquare,
                              {
                                borderColor: theme.main_blue,
                              },
                            ]}
                          >
                            <Check />
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.modalText}>{item}</Text>
                          <View style={styles.checkSquare} />
                        </View>
                      )}
                    </TouchableOpacity>
                    {index <= 2 && (
                      <View style={[styles.line, { marginTop: 18 }]} />
                    )}
                  </View>
                ))}
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
                <TouchableOpacity
                  onPress={() => {
                    setSelected(selectedKeyword);
                    onClose();
                  }}
                  style={styles.touchContainer}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      color: theme.main_blue,
                      fontFamily: "Pretendard-SemiBold",
                    }}
                  >
                    완료
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
    paddingBottom: SCREEN_HEIGHT / 20,
  },
  modal: {
    width: "100%",
    height: 244,
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
  touchContainer: {
    width: "100%",
    alignItems: "center",
  },
  keywordTouchContainer: {
    width: "100%",
    paddingHorizontal: 40,
  },
  checkSquare: {
    width: 19,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: theme.main_black,
    borderRadius: 4,
  },
  bar: {
    width: 54,
    height: 4,
    borderRadius: 30,
    backgroundColor: theme.gray100,
    marginBottom: 14,
    alignSelf: "center",
  },
});

export default CheckFilterModal;
