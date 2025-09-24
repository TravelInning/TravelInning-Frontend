import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { theme } from "../../colors/color";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useRef, useState } from "react";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import SeeMoreModal from "../SeeMoreModal";
import { addPostScrap, cancelPostScrap } from "../../api/companion/scrap";
import { useNavigation } from "@react-navigation/native";
import {
  addStoryPostScrap,
  cancelStoryPostScrap,
} from "../../api/storyroom/scrap";
import { mmdd, ymd } from "../../utils/time";
import { TOPIC_MAP } from "../../constants/mapping";

const ItemCard = ({
  item,
  from,
  isHaveScrap = true,
  canGoDetail = true,
  modalOptions,
}) => {
  const navigation = useNavigation();

  const [isScrap, setIsScrap] = useState(isHaveScrap);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);
  const {
    authorName,
    createdAt,
    id,
    title,
    content,
    thumbnailUrl,
    topic,
    status,
  } = item;

  const openModal = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const toggleScrap = async () => {
    try {
      if (from === "companion") {
        if (isScrap) {
          await cancelPostScrap(id);
        } else {
          await addPostScrap(id);
        }
      } else {
        if (isScrap) {
          await cancelStoryPostScrap(id);
        } else {
          await addStoryPostScrap(id);
        }
      }

      setIsScrap(!isScrap);
    } catch (e) {
      showToast("스크랩 오류! 다시 시도해주세요.");
    }
  };

  const goDetail = () => {
    if (canGoDetail) {
      if (from === "companion") {
        navigation.navigate("CompanionPostDetail", { id });
      } else {
        navigation.navigate("StoryPostDetail", { id });
      }
    }
  };

  return (
    <Shadow distance={2} startColor="#00000015" endColor="#00000000">
      <Pressable
        onPress={goDetail}
        android_ripple={{ radius: 300 }}
        style={styles.container}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 2,
              height: 71,
              justifyContent: "space-between",
              marginRight: 8,
            }}
          >
            {from === "companion" ? (
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
                  <Text style={styles.category}>
                    {topic ? TOPIC_MAP[topic] : TOPIC_MAP[status]}
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.storyContent}>
                  {content}
                </Text>
              </View>
            )}
            <Text style={styles.smallText}>
              {from === "companion"
                ? `${mmdd(createdAt)} • ${authorName}`
                : ymd(createdAt)}
            </Text>
          </View>
          {/* image */}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Image
              source={
                thumbnailUrl
                  ? { uri: thumbnailUrl }
                  : require("../../assets/images/companion/logo.png")
              }
              style={styles.photo}
            />
          </View>
          {/* modal button */}
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
        {/* scrap */}
        {isHaveScrap && (
          <View
            style={{
              position: "absolute",
              right: 43,
              bottom: 11,
            }}
          >
            <TouchableOpacity onPress={toggleScrap}>
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
          options={modalOptions}
        />
      </Pressable>
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
    paddingLeft: 18,
    paddingRight: 13,
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
    backgroundColor: "#eaeaea",
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
  smallText: {
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
});

export default ItemCard;
