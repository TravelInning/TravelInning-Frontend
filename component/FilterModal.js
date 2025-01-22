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
import { theme, SCREEN_WIDTH } from "../colors/color";
import Right from "../assets/icon/right_arrow.svg";
import Check from "../assets/icon/check_blue.svg";

const FilterModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const [keywordFilterToggle, setKeywordFilterToggle] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState([]);

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
    if (!visible) {
      setKeywordFilterToggle(false);
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    console.log(selectedKeyword);
  }, [selectedKeyword]);

  const toggleKeyword = (keyword) => {
    setSelectedKeyword((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((s) => s !== keyword)
        : [...prevSelected, keyword]
    );
  };

  const handleKeywordToggle = () => {
    Animated.timing(contentAnim, {
      toValue: keywordFilterToggle ? 0 : -SCREEN_WIDTH * 1.14,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setKeywordFilterToggle(!keywordFilterToggle));
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{ width: "100%", transform: [{ translateY: slideAnim }] }}
            >
              <Animated.View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  transform: [{ translateX: contentAnim }],
                }}
              >
                {/* Main Filter */}
                <View style={styles.modal}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.touchContainer}
                  >
                    <Text style={styles.modalText}>
                      구장과 가까운 순으로 보기
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.touchContainer}
                  >
                    <Text style={styles.modalText}>
                      내가 선택한 관광지 키워드만 보기
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                  <TouchableOpacity
                    onPress={handleKeywordToggle}
                    style={styles.touchContainer}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.modalText}>
                        그 외 관광지 키워드 선택하기
                      </Text>
                      <Right width={7} height={12} style={{ marginLeft: 6 }} />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.line} />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.touchContainer}
                  >
                    <Text
                      style={{ ...styles.modalText, color: theme.main_blue }}
                    >
                      스크랩한 장소만 보기
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Keyword Filter */}
                <View style={[styles.modal, { marginLeft: SCREEN_WIDTH / 4 }]}>
                  {["음식", "인문", "쇼핑", "기타"].map((item, index) => (
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
                        {selectedKeyword.includes(item) ? (
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
              </Animated.View>

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
                    if (keywordFilterToggle) {
                      // handleKeywordToggle();
                      setKeywordFilterToggle(false);
                      onClose();
                    } else {
                      onClose();
                    }
                  }}
                  style={styles.touchContainer}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      color: !keywordFilterToggle ? "#f00" : theme.main_blue,
                      fontFamily: keywordFilterToggle
                        ? "Pretendard-SemiBold"
                        : "Pretendard-Regular",
                    }}
                  >
                    {!keywordFilterToggle ? "취소" : "완료"}
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
    paddingBottom: 80,
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
});

export default FilterModal;
