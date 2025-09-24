import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../colors/color";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { useRef, useState } from "react";
import SeeMoreModal from "../SeeMoreModal";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "./CompanionComp";
import { mmdd } from "../../utils/time";
import CancleConfirmModal from "../CancleConfirmModal";

export const PostCard = ({
  item,
  onToggleScrap,
  onChangeState,
  onDeletePost,
  onBlockPost,
}) => {
  const navigation = useNavigation();
  const {
    id,
    title,
    content,
    authorName,
    scraped,
    thumbnailUrl,
    mine,
    status,
    createdAt,
  } = item;
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  const openModal = (e) => {
    e?.stopPropagation?.();
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const toggle = (e) => {
    e?.stopPropagation?.();
    onToggleScrap?.(id, !scraped);
  };

  const goDetail = () => {
    navigation.navigate("CompanionPostDetail", { id, scraped });
  };

  return (
    <Pressable
      onPress={goDetail}
      android_ripple={{ radius: 300 }}
      style={styles.postContainer}
    >
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
          <Text style={styles.date_authorName}>
            {mmdd(createdAt)} • {authorName}
          </Text>
          <Chip status={status} />
        </View>
      </View>
      {/* image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            thumbnailUrl
              ? { uri: thumbnailUrl }
              : require("../../assets/images/companion/logo.png")
          }
          style={styles.image}
        />
        <TouchableOpacity
          onPress={toggle}
          style={{ alignSelf: "flex-end", marginRight: 10 }}
        >
          {scraped ? (
            <BookmarkTrue width={12} height={15} />
          ) : (
            <BookmarkFalse width={12} height={15} />
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
        options={
          mine
            ? [
                { type: "share", text: "공유하기", onPress: () => {} },
                {
                  type: "change",
                  text: "상태 변경하기",
                  color: theme.main_blue,
                  onPress: async () => {
                    const newStatus =
                      status === "FINDING" ? "FOUND" : "FINDING";
                    await onChangeState?.(id, newStatus);
                  },
                },
                {
                  type: "reject",
                  text: "삭제하기",
                  color: "#f00",
                  onPress: () => setDeleteModalVisible(true),
                },
              ]
            : [
                { type: "share", text: "공유하기", onPress: () => {} },
                {
                  type: "reject",
                  text: "이 게시글 차단하기",
                  color: "#f00",
                  onPress: async () => await onBlockPost(id),
                },
              ]
        }
      />
      <CancleConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        text={`한 번 삭제한 글은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        onClick={async () => await onDeletePost(id)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    fontFamily: "Pretendard-Regular",
    fontSize: 11,
    color: "#545454",
    marginBottom: 8,
  },
  date_authorName: {
    fontFamily: "Pretendard-Regular",
    fontSize: 10,
    color: "#C2C2C2",
  },
  imageContainer: {
    flex: 3,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  image: {
    width: "90%",
    height: 50,
    resizeMode: "cover",
    borderRadius: 6,
    marginBottom: 8,
  },
});
