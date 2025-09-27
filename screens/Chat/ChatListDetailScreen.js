import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { SCREEN_HEIGHT, theme } from "../../colors/color";
import { LinearGradient } from "expo-linear-gradient";
import ChatBox from "../../component/chat/ChatBox";
import { useEffect, useState } from "react";
import { loadPostChatLists, loadRoomSummary } from "../../api/chat/chat";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatListDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const [header, setHeader] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // const headerData = await loadRoomSummary(postId);
      // setHeader(headerData);
      const roomData = await loadPostChatLists(postId);
      setRooms(roomData.rooms);
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/chat/chat_background.png")}
        resizeMode="cover"
        style={[theme.container, styles.background]}
      >
        <LinearGradient
          colors={["#0084FF18", "transparent"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={styles.postContainer}>
          <View style={{ flex: 3 }}>
            <Text style={styles.smallText}>작성일 | 2024년 12월 31일</Text>
            <Text numberOfLines={1} style={styles.title}>
              게시글 제목 | 영역은 표시해놓음요를레이후
            </Text>
            <Text numberOfLines={5} style={styles.postText}>
              {
                "안녕하세요\n저는 25살 여성 이아무개입니다.\n어쩌구ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ"
              }
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.showPostButton,
                { borderColor: !pressed ? "#69B7FF" : theme.main_blue },
              ]}
              onPress={() =>
                navigation.navigate("CompanionPostDetail", { id: postId })
              }
            >
              <Text style={styles.showPostButtonText}>
                {"해당 게시글 보러가기 >"}
              </Text>
            </Pressable>
          </View>
          {/* {header.authorView && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.smallText}>단체 채팅방 초대 코드</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.codeText}>QZEJRnp1</Text>
                <TouchableOpacity activeOpacity={0.5} style={styles.button}>
                  <Text style={styles.smallText}>복사</Text>
                </TouchableOpacity>
              </View>
            </View>
          )} */}
        </View>
      </ImageBackground>
      <View style={styles.chatConatiner}>
        <Text style={styles.mediumText}>이 게시글로 시작된 대화</Text>
        <FlatList
          data={rooms}
          keyExtractor={(item) => String(item.roomId)}
          renderItem={({ item }) => <ChatBox item={item} />}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 2,
            gap: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  background: {
    flex: 1,
    alignItems: "center",
    maxHeight: 390,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "30%",
  },
  postContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: SCREEN_HEIGHT / 30,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#F4F4F4",
  },
  chatConatiner: {
    flex: 1,
    width: "100%",
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    width: 126,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: "#313131",
  },
  postText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: theme.main_black,
    marginVertical: 10,
  },
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 24,
    marginTop: 10,
  },
  codeText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    color: theme.main_blue,
  },
  mediumText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 15,
    color: "#313131",
    marginBottom: 20,
  },
  button: {
    width: 38,
    height: 19,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#fff",
  },
  showPostButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 24,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  showPostButtonText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 11,
    color: theme.main_blue,
  },
});
