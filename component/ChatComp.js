import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../colors/color";
import { useNavigation } from "@react-navigation/native";

export function AloneChatBox() {
  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ marginBottom: 20 }}
    >
      <View style={styles.boxContainer}>
        <Image
          source={require("../assets/images/selectphoto/photo1.png")}
          style={styles.aloneImg}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mediumText}>상대 닉네임과의 1:1 채팅</Text>
          <Text numberOfLines={1} style={styles.smallText}>
            ㅋㅋㅋ넹 조아여(마지막 채팅 내용)
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.timeText}>19:25</Text>
          <View style={styles.circle}>
            <Text style={styles.chatNumberText}>2</Text>
          </View>
        </View>
      </View>
    </Shadow>
  );
}

export function GroupChatBox() {
  const images = [
    require("../assets/images/selectphoto/photo1.png"),
    require("../assets/images/selectphoto/photo1.png"),
    require("../assets/images/selectphoto/photo1.png"),
    require("../assets/images/selectphoto/photo1.png"),
  ];

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ marginBottom: 20 }}
    >
      <View style={styles.boxContainer}>
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.groupImg} />
          ))}
        </View>
        <View style={[styles.textContainer, { marginHorizontal: 10 }]}>
          <Text style={styles.mediumText}>단체 대화방</Text>
          <Text numberOfLines={1} style={styles.smallText}>
            ㅋㅋㅋ넹 조아여(마지막 채팅 내용)
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.timeText}>19:25</Text>
          <View style={styles.circle}>
            <Text style={styles.chatNumberText}>2</Text>
          </View>
        </View>
      </View>
    </Shadow>
  );
}

export const ChatListBox = ({
  isWriter,
  isGroup,
  isNewChat,
  title,
  content,
  time,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.push("ChatListDetail");
      }}
      style={({ pressed }) => [
        styles.chatContainer,
        { backgroundColor: !pressed ? "#FFF" : "#F7F8FA" },
      ]}
    >
      <View>
        <View style={theme.rowContainer}>
          <Text style={styles.title}>
            {isWriter ? title : title.slice(0, 5) + "..에 대한 채팅내역"}
          </Text>
          {isNewChat ? (
            <Image
              source={require("../assets/icon/chat_new.png")}
              style={styles.chatImage}
            />
          ) : (
            <Image
              source={require("../assets/icon/chat.png")}
              style={styles.chatImage}
            />
          )}
        </View>
        <Text numberOfLines={1} style={styles.content}>
          {content}
        </Text>
        {isGroup && (
          <Image
            source={require("../assets/images/chat/group_chat.png")}
            style={{ width: 19, resizeMode: "contain" }}
          />
        )}
      </View>
      <View style={{ height: "100%", justifyContent: "space-between" }}>
        <Text style={styles.time}>{time}</Text>
        {!isWriter && (
          <TouchableOpacity
            onPress={() => {
              console.log("나가기 클릭");
            }}
          >
            <Image
              source={require("../assets/images/chat/out.png")}
              style={styles.outImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  textContainer: { flex: 1, marginHorizontal: 12 },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 64,
    height: 64,
    marginLeft: -1,
  },
  groupImg: {
    width: 28,
    aspectRatio: 1,
    borderRadius: 9,
    resizeMode: "cover",
    margin: 2,
  },
  aloneImg: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 21,
    resizeMode: "cover",
  },
  smallText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 11,
    color: "#313131",
  },
  mediumText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 15,
    color: "#313131",
    marginBottom: 6,
  },
  timeText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 11,
    color: "#B8B8B8",
    marginBottom: 10,
  },
  chatNumberText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: "#fff",
  },
  circle: {
    width: 20,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.main_blue,
    borderRadius: 30,
  },
  chatContainer: {
    flexDirection: "row",
    width: "100%",
    height: 92,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#F4F4F4",
  },
  title: {
    fontSize: 18,
    fontFamily: "Pretendard-Bold",
    color: theme.main_black,
  },
  content: {
    fontSize: 11,
    fontFamily: "Pretendard-Regular",
    color: "#313131",
    marginTop: 4,
    marginBottom: 8,
  },
  time: {
    fontSize: 11,
    fontFamily: "Pretendard-Medium",
    color: "#B8B8B8",
  },
  chatImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginLeft: 4,
  },
  outImage: {
    width: 12,
    height: 14,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginBottom: 2,
  },
});
