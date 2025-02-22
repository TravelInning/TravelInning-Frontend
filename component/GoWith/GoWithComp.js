import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { theme } from "../../colors/color";
import Done from "../../assets/icon/gowith/done.svg";
import InProgress from "../../assets/icon/gowith/inprogress.svg";
import ClipFalse from "../../assets/icon/bookmark_false.svg";
import ClipTrue from "../../assets/icon/bookmark_true.svg";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { useEffect, useRef, useState } from "react";
import SeeMoreModal from "../SeeMoreModal";
import Check from "../../assets/icon/gowith/filter_check.svg";
import Progress from "../../assets/icon/gowith/filter_progress.svg";

export const Story = ({ text, state }) => {
  return (
    <View style={{ alignItems: "center", marginRight: 16 }}>
      <View>
        <Image
          source={require("../../assets/images/gowith/logo_circle.png")}
          style={styles.circle}
        />
        {state === "ended" && (
          <View
            style={{
              ...styles.circle,
              position: "absolute",
              backgroundColor: "#00000050",
            }}
          >
            <Text style={styles.postendText}>게시 종료</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyText}>{text && text.slice(0, 6)}...</Text>
      <View
        style={[
          styles.miniCircle,
          {
            backgroundColor:
              state === "inProgress"
                ? theme.main_blue
                : state === "done"
                ? "#545454"
                : "transperant",
          },
        ]}
      />
    </View>
  );
};

export const PostCard = ({
  title,
  content,
  date,
  club,
  isDone = false,
  setDeleteModalVisible,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clipState, setClipState] = useState(false); // 스크랩
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
    <View style={styles.postContainer}>
      {/* content-text */}
      <View style={{ flex: 6.5, paddingRight: 14 }}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.content}>
          {content}
        </Text>
        <View
          style={{ ...theme.rowContainer, justifyContent: "space-between" }}
        >
          <Text style={styles.dateAndClub}>
            {date} • {club}
          </Text>
          <View
            style={[
              styles.chipContainer,
              isDone && { backgroundColor: "#545454" },
            ]}
          >
            <View style={theme.rowContainer}>
              {isDone ? (
                <Done width={7} height={7} />
              ) : (
                <InProgress width={8} height={8} />
              )}
              <Text style={styles.chipText}>
                {isDone ? "구했어요" : "구하는중"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/gowith/logo.png")}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => setClipState(!clipState)}
          style={{ alignSelf: "flex-end", marginRight: 10 }}
        >
          {clipState ? (
            <ClipTrue width={12} height={15} />
          ) : (
            <ClipFalse width={12} height={15} />
          )}
        </TouchableOpacity>
      </View>
      {/* seemore button */}
      <View
        style={{
          flex: 0.5,
          alignItems: "flex-end",
          paddingTop: 2,
        }}
      >
        <TouchableOpacity
          ref={buttonRef}
          onPress={openModal}
          style={{ marginLeft: 13 }}
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
        from="gowith"
        setDeleteModalVisible={setDeleteModalVisible}
      />
    </View>
  );
};

// gowithscreen filter
export const FilterDropDown = ({
  visible,
  onClose,
  buttonPosition,
  selectedFilter,
  setFilterState,
}) => {
  const FILTER_OPTIONS = {
    filter1: ["최신순", "스크랩"],
    filter2: ["구했어요", "구하는중"],
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
                onClose();
              }}
              style={[
                index < FILTER_OPTIONS[selectedFilter].length - 1 && {
                  marginBottom: 14,
                },
                selectedFilter === "filter2" && {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              {selectedFilter === "filter2" ? (
                index === 0 ? (
                  <Check style={{ marginRight: 4 }} />
                ) : (
                  <Progress style={{ marginRight: 4 }} />
                )
              ) : (
                <></>
              )}
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 30,
  },
  storyText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    color: theme.main_black,
  },
  miniCircle: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 30,
    position: "absolute",
    top: 0,
    right: 4,
  },
  postendText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    color: "#FFF",
  },
  postContainer: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 12,
    borderColor: theme.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 14,
    color: "#2A2A2A",
    marginBottom: 2,
  },
  content: {
    fontFamily: "Pretendard-Regular",
    fontSize: 11,
    color: "#545454",
    marginBottom: 8,
  },
  dateAndClub: {
    fontFamily: "Pretendard-Regular",
    fontSize: 10,
    color: "#C2C2C2",
  },
  chipContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    backgroundColor: theme.main_blue,
  },
  chipText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 8,
    color: "#FFF",
    marginLeft: 2,
  },
  imageContainer: {
    flex: 3,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  image: {
    width: "90%",
    height: 50,
    resizeMode: "contain",
    borderRadius: 6,
    marginBottom: 8,
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
    backgroundColor: "transparent",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
});
