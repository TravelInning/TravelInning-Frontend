import React, { memo, useMemo, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { theme } from "../../colors/color";
import { Shadow } from "react-native-shadow-2";
import ScrapOff from "../../assets/icon/bookmark_false.svg";
import ScrapOn from "../../assets/icon/bookmark_true.svg";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import SeeMoreModal from "../SeeMoreModal";
import { getRemainingMMSS, timeAgo } from "../../utils/time";
import { useNavigation } from "@react-navigation/native";
import { normalizeImageUrl } from "../../utils/image";
import { TOPIC_MAP } from "../../constants/mapping";

const StoryBox = ({ item, onToggleScrap, onBlockRoom }) => {
  const navigation = useNavigation();
  const { id, topic, createdAt, content, thumbnailUrl, limitTime, scrapped } =
    item;
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  const endLabel = useMemo(
    () => getRemainingMMSS(createdAt, limitTime),
    [createdAt, limitTime]
  );
  const imgUri = normalizeImageUrl(thumbnailUrl);

  const openModal = () => {
    buttonRef.current?.measure?.((x, y, w, h, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible((v) => !v);
  };

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
    >
      <Pressable
        onPress={() => navigation.navigate("StoryPostDetail", { id })}
        style={styles.boxContainer}
      >
        <View style={styles.columnContainer}>
          <View style={styles.blueBox}>
            <Text style={styles.topic}>{TOPIC_MAP[topic]}</Text>
          </View>
          <Text style={styles.time}>{timeAgo(createdAt)}</Text>
        </View>
        <Text numberOfLines={2} style={styles.content}>
          {content}
        </Text>
        <View style={[styles.columnContainer, { width: 92 }]}>
          <Image
            source={
              imgUri
                ? { uri: imgUri }
                : require("../../assets/images/companion/logo.png")
            }
            style={styles.photo}
          />
          <View style={styles.rowContainer}>
            {endLabel ? (
              <View style={styles.blueBox}>
                <Text style={styles.remainTime}>{endLabel} 입장 마감!</Text>
              </View>
            ) : (
              <View style={[styles.blueBox, { backgroundColor: "#c8c8c8" }]}>
                <Text style={[styles.remainTime, { color: "gray" }]}>
                  입장 마감
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => onToggleScrap(id, !scrapped)}
              style={{ marginLeft: 4 }}
            >
              {scrapped ? (
                <ScrapOn width={12} height={15} />
              ) : (
                <ScrapOff width={12} height={15} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", paddingTop: 2 }}>
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
          options={[
            { type: "share", text: "공유하기", onPress: () => {} },
            {
              type: "reject",
              text: "이 게시글 신고하기",
              color: "#f00",
              onPress: () => onBlockRoom(id),
            },
          ]}
        />
      </Pressable>
    </Shadow>
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
  remainTime: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 8,
    color: theme.main_blue,
  },
  topic: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: theme.main_blue,
  },
  time: { fontFamily: "Pretendard-Regular", fontSize: 10, color: "#C2C2C2" },
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
    backgroundColor: "#eaeaea",
  },
});

export default memo(StoryBox, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.onToggleScrap === next.onToggleScrap &&
    prev.onBlockRoom === next.onBlockRoom
  );
});
