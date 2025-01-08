import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { theme } from "../../colors/color";
import { LinearGradient } from "expo-linear-gradient";
import { AloneChatBox, GroupChatBox } from "../../component/ChatComp";

export default function PostChatScreen() {
  return (
    <SafeAreaView style={theme.container}>
      <ImageBackground
        source={require("../../assets/images/chat/chat_background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={["#0084FF20", "transparent"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={styles.postContainer}>
          <View>
            <Text style={styles.smallText}>작성일 | 2024년 12월 31일</Text>
            <Text numberOfLines={1} style={styles.title}>
              게시글 제목 | 영역은 표시해놓음요를레이후
            </Text>
            <Text style={styles.smallText}>
              {
                "안녕하세요\n저는 25살 여성 이아무개입니다.\n어쩌구ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ"
              }
            </Text>
          </View>
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Text style={styles.smallText}>단체 채팅방 초대 코드</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.codeText}>QZEJRnp1</Text>
              <TouchableOpacity activeOpacity={0.5} style={styles.button}>
                <Text style={styles.smallText}>복사</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.chatConatiner}>
        <Text style={styles.mediumText}>이 게시글로 시작된 대화</Text>
        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id} /> */}
        <FlatList
          data={[0, 1, 2, 3]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return item % 2 === 0 ? <AloneChatBox /> : <GroupChatBox />;
          }}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 2,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#F4F4F4",
  },
  chatConatiner: {
    flex: 1,
    width: "100%",
    padding: 20,
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
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 24,
    marginTop: 10,
    marginBottom: 24,
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
});
