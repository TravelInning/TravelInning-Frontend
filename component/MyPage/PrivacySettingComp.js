import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { theme } from "../../colors/color";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useRef, useState } from "react";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import SeeMoreModal from "../SeeMoreModal";

export const CompCard = ({
  title,
  content,
  distance,
  photo,
  date,
  nickname,
  category,
  from,
  isHaveScrap = false,
  isMyPost = false,
  isVisibleModal = false,
}) => {
  const [isScrap, setIsScrap] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    handleScrap();
  }, [isScrap]);

  const handleScrap = () => {
    // 나중에 저장 상태변경 코드
  };

  const openModal = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const handleReset = (from, id) => {
    if (from === "place") {
    } else if (from === "companion") {
    } else {
    }
  };

  return (
    <Shadow distance={2} startColor="#00000015" endColor="#00000000">
      <View style={[styles.container, isVisibleModal && { paddingRight: 13 }]}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          {/* text */}
          <View
            style={{
              flex: 2,
              height: 71,
              justifyContent: "space-between",
              marginRight: 8,
            }}
          >
            {from !== "story" ? (
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  style={styles.title}
                >
                  {title}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.content}
                >
                  {content}
                </Text>
              </View>
            ) : (
              <View style={styles.rowContainer}>
                <View style={styles.blueBox}>
                  <Text style={styles.category}>{category}</Text>
                </View>
                <Text numberOfLines={2} style={styles.storyContent}>
                  {content}
                </Text>
              </View>
            )}
            <Text style={styles.distance}>
              {from === "place"
                ? `• ${distance}km`
                : from === "story"
                ? date
                : isMyPost
                ? date
                : `${date} • ${nickname}`}
            </Text>
          </View>
          {/* image */}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Image source={photo} style={styles.photo} />
          </View>
          {/* modal button */}
          {isVisibleModal && (
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
          )}
        </View>
        {/* scrap */}
        {isHaveScrap && (
          <View
            style={{
              position: "absolute",
              right: 43,
              bottom: 11,
            }}
          >
            <TouchableOpacity onPress={() => setIsScrap(!isScrap)}>
              {isScrap ? (
                <BookmarkTrue width={11} height={14} />
              ) : (
                <BookmarkFalse width={12} height={15} />
              )}
            </TouchableOpacity>
          </View>
        )}
        <SeeMoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonPosition={buttonPosition}
          options={[
            {
              type: "reset",
              text: from === "place" ? "다시 추천받기" : "차단 해제하기",
              type: "reset",
              onPress: () => handleReset(from, id),
              color: theme.main_blue,
            },
          ]}
        />
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  photo: {
    width: "100%",
    height: 50,
    resizeMode: "cover",
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: "#000",
  },
  content: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
  distance: {
    fontSize: 10,
    fontFamily: "Pretendard-Medium",
    color: "#C2C2C2",
  },
  blueBox: {
    height: 18,
    alignItems: "center",
    justifyContent: "center",
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
  storyContent: {
    flex: 1,
    marginHorizontal: 6,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: theme.main_black,
  },

  // modal
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    color: theme.main_blue,
  },
});
