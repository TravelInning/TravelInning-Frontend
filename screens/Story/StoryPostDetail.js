import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "../../colors/color";
import Share from "../../assets/icon/companion/share.svg";
import SeeMore from "../../assets/icon/companion/see_more.svg";
import Chat from "../../assets/icon/companion/chat.svg";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import { showToast } from "../../component/Toast";
import OptionModal from "../../component/common/OptionModal";
import { Header } from "../../component/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRemainingMMSS, timeAgo } from "../../utils/time";
import { deleteStoryPost, loadStoryPostDetail } from "../../api/storyroom/room";
import {
  addStoryPostScrap,
  cancelStoryPostScrap,
} from "../../api/storyroom/scrap";
import { TOPIC_MAP } from "../../constants/mapping";

const StoryPostDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [isScrap, setIsScrap] = useState(null);
  const [pending, setPending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const handlePost = async () => {
      const result = await loadStoryPostDetail(id);
      if (result) {
        setIsScrap(result.scrapped);
        setPost(result);
      }
      console.log("post detail: ", result);
    };
    const handleUserName = async () => {
      try {
        const nickname = await AsyncStorage.getItem("userName");
        setUserName(nickname);
      } catch (error) {
        console.log("getItem userName error: ", error);
      }
    };
    handlePost();
    handleUserName();
  }, []);

  const endLabel = useMemo(
    () => getRemainingMMSS(post?.createdAt, post?.limitTime),
    [post]
  );

  const toggleScrap = async () => {
    if (pending) return;
    setPending(true);
    try {
      const next = !isScrap;
      if (next) await addStoryPostScrap(id);
      else await cancelStoryPostScrap(id);
      setIsScrap(next);
    } catch (e) {
      showToast("스크랩 오류! 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  };

  const onClickChat = async () => {
    if (!post?.roomId) {
      showToast("채팅방을 준비 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }
    navigation.navigate("ChatStory", {
      roomId: post.roomId,
      topicText: post.content,
    });
  };

  return (
    <SafeAreaView style={theme.container}>
      {/* header */}
      <Header>
        <View style={styles.headerRightBox}>
          <TouchableOpacity>
            <Share width={15} height={15} />
          </TouchableOpacity>
          {post?.authorName === userName && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <SeeMore width={15} height={15} />
            </TouchableOpacity>
          )}
        </View>
      </Header>

      {/* content */}
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ ...styles.container, paddingBottom: 12 }}>
          <View style={styles.chipContainer}>
            <Text style={styles.topic}>{TOPIC_MAP[post?.topic]}</Text>
            {endLabel ? (
              <Text style={styles.remainTime}>{endLabel}에 문이 닫혀요!</Text>
            ) : (
              <Text
                style={[
                  styles.remainTime,
                  { backgroundColor: "#c8c8c8", color: "gray" },
                ]}
              >
                입장 마감
              </Text>
            )}
          </View>
          <View style={styles.userHeader}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Image
                source={require("../../assets/images/companion/logo.png")}
                style={styles.profileImg}
              />
              <View style={{ gap: 3 }}>
                <Text style={styles.nickname}>{post?.authorName}</Text>
                <Text style={styles.time}>{timeAgo(post?.createdAt)}</Text>
              </View>
            </View>
            {endLabel && (
              <TouchableOpacity
                onPress={onClickChat}
                style={{ alignItems: "center", gap: 5 }}
              >
                <Chat width={22} height={22} />
                <Text style={styles.chat}>입장하기</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.content}>{post?.content}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.participant}>
              <Image
                source={require("../../assets/images/story/participant.png")}
                style={{ width: 19, resizeMode: "contain" }}
              />
              <Text style={[styles.chat, { fontSize: 10 }]}>
                {post?.participantCount}명 입장중
              </Text>
            </View>
            <TouchableOpacity onPress={toggleScrap} disabled={pending}>
              {isScrap ? (
                <BookmarkTrue width={15} height={20} />
              ) : (
                <BookmarkFalse width={15} height={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 10, backgroundColor: "#EDEDED" }} />

        <View style={{ ...styles.container, gap: 20 }}>
          {post?.imageUrls?.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.postImage} />
          ))}
        </View>
      </ScrollView>

      <OptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[
          {
            label: "삭제하기",
            onPress: async () => {
              await deleteStoryPost(id);
              navigation.goBack();
            },
            color: "#f00",
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerRightBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    resizeMode: "cover",
  },
  nickname: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 14,
    color: theme.main_black,
  },
  time: {
    fontFamily: "Pretendard-Medium",
    fontSize: 8,
    color: "#9C9C9C",
  },
  chat: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 9,
    color: theme.main_blue,
  },
  textContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: theme.main_black,
    marginBottom: 10,
  },
  content: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#545454",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 3,
    resizeMode: "cover",
    backgroundColor: "#F2F2F2",
  },
  chipContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  topic: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 3,
    backgroundColor: "#EFF7FF",

    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: theme.main_blue,
  },
  remainTime: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: theme.main_blue,

    fontFamily: "Pretendard-SemiBold",
    fontSize: 8,
    color: "#fff",
  },
  participant: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 15,
    backgroundColor: "#EFF7FF",
  },
});

export default StoryPostDetail;
