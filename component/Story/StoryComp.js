import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../colors/color";
import { Shadow } from "react-native-shadow-2";
import ClipFalse from "../../assets/icon/bookmark_false.svg";
import ClipTrue from "../../assets/icon/bookmark_true.svg";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { useEffect, useRef, useState } from "react";
import SeeMoreModal from "../SeeMoreModal";
import Check from "../../assets/icon/gowith/filter_check.svg";
import Progress from "../../assets/icon/gowith/filter_progress.svg";

export const StoryBox = ({ category, time, content, photo, limitedTime }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clipState, setClipState] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    //console.log(clipState);
    handleClip();
  }, [clipState]);

  // 알림 모달 열기
  const openModal = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const handleClip = () => {
    // 나중에 저장 상태변경 코드
  };

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
    >
      <View style={styles.boxContainer}>
        {/* category&time */}
        <View style={styles.columnContainer}>
          <View style={styles.blueBox}>
            <Text style={styles.category}>{category}</Text>
          </View>
          <Text style={styles.time}>{time}</Text>
        </View>
        {/* content */}
        <Text numberOfLines={2} style={styles.content}>
          {content}
        </Text>
        {/* photo&limitedTime&bookmark */}
        <View style={[styles.columnContainer, { width: 92 }]}>
          <Image source={photo} style={styles.photo} />
          <View style={styles.rowContainer}>
            <View style={styles.blueBox}>
              <Text style={styles.limitedTime}>
                {limitedTime} 후 입장 마감!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setClipState(!clipState)}
              style={{ marginLeft: 4 }}
            >
              {clipState ? (
                <ClipTrue width={12} height={15} />
              ) : (
                <ClipFalse width={12} height={15} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* ... (seemore button) */}
        <View
          style={{
            alignItems: "flex-end",
            paddingTop: 2,
          }}
        >
          <TouchableOpacity
            ref={buttonRef}
            onPress={openModal}
            style={{ marginLeft: 10 }}
          >
            <View
              style={{
                width: 17,
                height: 17,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: modalVisible ? "#EFF7FF" : "#fff",
                borderRadius: 30,
              }}
            >
              {modalVisible ? (
                <SeeMoreActivate width={13} height={13} />
              ) : (
                <SeeMore width={13} height={13} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <SeeMoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonPosition={buttonPosition}
          from="story"
        />
      </View>
    </Shadow>
  );
};

// storyscreen filter
export const FilterDropDown = ({
  visible,
  onClose,
  buttonPosition,
  selectedFilter,
  setFilterState,
}) => {
  const FILTER_OPTIONS = {
    filter1: ["최신순", "스크랩"],
    filter2: ["이야기해요", "끝난이야기"],
    filter3: ["야구", "기사/뉴스", "일상", "성/연애"],
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.dropdownContainer,
            { top: buttonPosition.top - 20, left: buttonPosition.left },
          ]}
        >
          {FILTER_OPTIONS[selectedFilter]?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setFilterState(item);
                console.log("클릭");
                onClose();
              }}
              style={[
                index < FILTER_OPTIONS[selectedFilter].length - 1 && {
                  marginBottom: 14,
                },
              ]}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    width: "100%",
    height: 76,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnContainer: { height: "100%", justifyContent: "space-between" },
  blueBox: {
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#0084FF10",
    borderRadius: 4,
  },
  category: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: theme.main_blue,
  },
  time: {
    fontFamily: "Pretendard-Regular",
    fontSize: 10,
    color: "#C2C2C2",
  },
  content: {
    flex: 1,
    marginHorizontal: 6,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: theme.main_black,
  },
  photo: {
    width: 92,
    height: 36,
    resizeMode: "cover",
    borderRadius: 8,
  },
  limitedTime: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 8,
    color: theme.main_blue,
  },

  // filter modal(dropdown)
  dropdownContainer: {
    minHeight: 74,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.borderColor,
    position: "absolute",
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "red",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
});
