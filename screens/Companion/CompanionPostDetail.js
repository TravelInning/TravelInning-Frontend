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
import { loadPost } from "../../api/companion/post";
import { theme } from "../../colors/color";
import Share from "../../assets/icon/companion/share.svg";
import SeeMore from "../../assets/icon/companion/see_more.svg";
import Chat from "../../assets/icon/companion/chat.svg";
import Left from "../../assets/icon/left_arrow.svg";
import { Chip } from "../../component/Companion/CompanionComp";
import BookmarkFalse from "../../assets/icon/bookmark_false.svg";
import BookmarkTrue from "../../assets/icon/bookmark_true.svg";
import { showToast } from "../../component/Toast";
import { addPostScrap, cancelPostScrap } from "../../api/companion/scrap";
import OptionModal from "../../component/common/OptionModal";
import { Header } from "../../component/Header/Header";

const CompanionPostDetail = ({ navigation, route }) => {
  const { id, scraped } = route.params;
  const [post, setPost] = useState(null);
  const [isScrap, setIsScrap] = useState(!!scraped);
  const [pending, setPending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDone, setIsDone] = useState("FINDING");

  useEffect(() => {
    (async () => {
      const result = await loadPost(id);
      if (result) setPost(result);
    })();
  }, []);

  useEffect(() => {
    console.log("isDone: ", isDone);
  }, [isDone]);

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

  return (
    <SafeAreaView style={theme.container}>
      {/* header */}
      <Header>
        <View style={styles.headerRightBox}>
          <TouchableOpacity>
            <Share width={15} height={15} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <SeeMore width={15} height={15} />
          </TouchableOpacity>
        </View>
      </Header>

      {/* content */}
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ ...styles.container, paddingBottom: 12 }}>
          <Chip isDone={isDone} />
          <View style={styles.userHeader}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Image
                source={require("../../assets/images/companion/logo.png")}
                style={styles.profileImg}
              />
              <View style={{ gap: 3 }}>
                <Text style={styles.nickname}>{post?.authorName}</Text>
                <Text style={styles.time}>2시간 전</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  postId: id,
                })
              }
              style={{ alignItems: "center", gap: 5 }}
            >
              <Chat width={22} height={22} />
              <Text style={styles.chat}>대화하기</Text>
            </TouchableOpacity>
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
        selectedSub={isDone}
        onSelectSub={(value) => setIsDone(value)}
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
