import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { changePostState, loadPost } from "../../api/companion/post";
import { theme } from "../../colors/color";
import Share from "../../assets/icon/companion/share.svg";
import SeeMore from "../../assets/icon/companion/see_more.svg";
import Chat from "../../assets/icon/companion/chat.svg";
import { Chip } from "../../component/Companion/CompanionComp";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import { showToast } from "../../component/Toast";
import { addPostScrap, cancelPostScrap } from "../../api/companion/scrap";
import OptionModal from "../../component/common/OptionModal";
import { Header } from "../../component/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { timeAgo } from "../../utils/time";
import { openOrCreateOneOnOne } from "../../api/chat/openOrCreate";

const CompanionPostDetail = ({ navigation, route }) => {
  const { id, scraped, createdAt } = route.params;
  const [post, setPost] = useState(null);
  const [isScrap, setIsScrap] = useState(!!scraped);
  const [pending, setPending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const handlePost = async () => {
      const result = await loadPost(id);
      if (result) setPost(result);
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

  const toggleScrap = async () => {
    if (pending) return;
    setPending(true);
    try {
      const next = !isScrap;
      if (next) await addPostScrap(id);
      else await cancelPostScrap(id);
      setIsScrap(next);
    } catch (e) {
      showToast("스크랩 오류! 다시 시도해주세요.");
    } finally {
      setPending(false);
    }
  };

  const onClickChat = async () => {
    try {
      const { roomId, peerName: name } = await openOrCreateOneOnOne(id);
      if (!roomId) {
        showToast("대화방을 만들 수 없어요. 잠시 후 다시 시도해주세요.");
        return;
      }
      navigation.navigate("Chat", {
        initialRoomId: roomId,
        postId: id,
        peerName: name || post?.authorName || "상대 닉네임",
      });
    } catch (e) {
      showToast("대화방 열기에 실패했어요.");
    }
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
          <Chip status={post?.status} />
          <View style={styles.userHeader}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Image
                source={require("../../assets/images/companion/logo.png")}
                style={styles.profileImg}
              />
              <View style={{ gap: 3 }}>
                <Text style={styles.nickname}>{post?.authorName}</Text>
                <Text style={styles.time}>{timeAgo(createdAt)}</Text>
              </View>
            </View>
            {post?.authorName !== userName && (
              <TouchableOpacity
                onPress={onClickChat}
                style={{ alignItems: "center", gap: 5 }}
              >
                <Chat width={22} height={22} />
                <Text style={styles.chat}>대화하기</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{post?.title}</Text>
            <Text style={styles.content}>{post?.content}</Text>
          </View>

          <TouchableOpacity
            onPress={toggleScrap}
            disabled={pending}
            style={{ alignSelf: "flex-end" }}
          >
            {isScrap ? (
              <BookmarkTrue width={15} height={20} />
            ) : (
              <BookmarkFalse width={15} height={20} />
            )}
          </TouchableOpacity>
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
            label: "글 수정하기",
            onPress: () => {},
          },
          {
            label: "상태 변경하기",
            onPress: async () => {
              await changePostState(
                id,
                post.status === "FINDING" ? "FOUND" : "FINDING"
              );
            },
            hasNext: true,
          },
          {
            label: "삭제하기",
            onPress: async () => {
              await deletePost(id);
              navigation.goBack();
            },
            color: "#f00",
          },
        ]}
        subOptions={["FINDING", "FOUND"]}
        selectedSub={post?.status}
        onSelectSub={(value) =>
          setPost((prev) => ({
            ...prev,
            status: value,
          }))
        }
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
    paddingTop: 10,
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
});

export default CompanionPostDetail;
