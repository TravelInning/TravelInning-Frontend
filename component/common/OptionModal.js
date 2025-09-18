import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from "react-native";
import { theme, SCREEN_WIDTH, SCREEN_HEIGHT } from "../../colors/color";
import Right from "../../assets/icon/right_arrow.svg";
import Check from "../../assets/icon/check_blue.svg";

const stateMap = {
  FINDING: "구하는중",
  FOUND: "구했어요",
  음식: "음식",
  인문: "인문",
  쇼핑: "쇼핑",
  기타: "기타",
};

const OptionModal = ({
  visible,
  onClose,
  options = [],
  subOptions = [],
  selectedSub = null,
  onSelectSub,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const [showSub, setShowSub] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(selectedSub);

  const toggleKeyword = (keyword) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
  };

  useEffect(() => {
    if (visible) {
      setSelectedKeyword(selectedSub ?? null);
    }
  }, [visible, selectedSub]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) {
        setShowSub(false);
        contentAnim.setValue(0);
      }
    });
  }, [visible]);

  const handleToggleSub = () => {
    if (!subOptions.length) return;
    const toValue = showSub ? 0 : -SCREEN_WIDTH * 1.14;
    Animated.timing(contentAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowSub(!showSub));
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
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
                {/* Main Options */}
                <View style={[styles.modal, { alignSelf: "flex-end" }]}>
                  {options.map((opt, index) => (
                    <Fragment key={index}>
                      <TouchableOpacity
                        onPress={opt.hasNext ? handleToggleSub : opt.onPress}
                        style={styles.touchContainer}
                      >
                        <View style={styles.optionRow}>
                          <Text
                            style={[
                              styles.modalText,
                              opt.selected && { color: theme.main_blue },
                              opt.color && { color: opt.color },
                            ]}
                          >
                            {opt.label}
                          </Text>
                          {opt.hasNext && (
                            <Right
                              width={7}
                              height={12}
                              style={{ marginLeft: 6 }}
                            />
                          )}
                        </View>
                      </TouchableOpacity>

                      {index < options.length - 1 && (
                        <View style={styles.line} />
                      )}
                    </Fragment>
                  ))}
                </View>

                {/* Sub Options */}
                {subOptions.length > 0 && (
                  <View
                    style={[
                      styles.modal,
                      {
                        marginLeft: SCREEN_WIDTH / 4,
                        height: subOptions.length * 65,
                        alignSelf: "flex-end",
                      },
                    ]}
                  >
                    {subOptions.map((item, index) => (
                      <Fragment key={index}>
                        <TouchableOpacity
                          onPress={() => toggleKeyword(item)}
                          style={styles.keywordTouchContainer}
                        >
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
                                selectedKeyword === item && {
                                  color: theme.main_blue,
                                  fontFamily: "Pretendard-Medium",
                                },
                              ]}
                            >
                              {stateMap[item]}
                            </Text>
                            <View
                              style={[
                                styles.checkSquare,
                                selectedKeyword === item && {
                                  borderColor: theme.main_blue,
                                },
                              ]}
                            >
                              {selectedKeyword === item && <Check />}
                            </View>
                          </View>
                        </TouchableOpacity>

                        {index < subOptions.length - 1 && (
                          <View style={styles.line} />
                        )}
                      </Fragment>
                    ))}
                  </View>
                )}
              </Animated.View>

              {/* Bottom Button */}
              <View style={styles.bottomButton}>
                <TouchableOpacity
                  onPress={() => {
                    if (showSub) {
                      if (selectedKeyword == null) return;
                      onSelectSub?.(selectedKeyword);
                    }
                    onClose();
                  }}
                  style={styles.touchContainer}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      color: !showSub ? "#f00" : theme.main_blue,
                      fontFamily: showSub
                        ? "Pretendard-SemiBold"
                        : "Pretendard-Regular",
                    }}
                  >
                    {!showSub ? "취소" : "완료"}
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
    alignItems: "center",
    gap: 20,
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
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  bottomButton: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 9,
    marginTop: 20,
  },
});

export default OptionModal;
