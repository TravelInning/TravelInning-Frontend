import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../colors/color";
import { useNavigation } from "@react-navigation/native";
import { hhmm } from "../../utils/time";

const ChatBox = ({ item, isGroup }) => {
  const images = [
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
  ];

  const navigation = useNavigation();

  const {
    group,
    lastAt,
    lastMessage,
    roomId,
    postId,
    roomTitle,
    lastMesaageId,
  } = item;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", {
          initialRoomId: roomId,
          postId,
          peerName: roomTitle,
        })
      }
      style={({ pressed }) => [
        styles.chatContainer,
        { backgroundColor: !pressed ? "#FFF" : theme.gray50 },
      ]}
    >
      {group ? (
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.groupImg} />
          ))}
        </View>
      ) : (
        <View>
          <Image source={images[0]} style={styles.aloneImg} />
          <View style={{ position: "absolute", right: -5, bottom: -4 }}>
            <Shadow
              distance={2}
              startColor="rgba(0, 0, 0, 0.1)"
              finalColor="rgba(0, 0, 0, 0)"
            >
              <View style={styles.receivedCodeContainer}>
                <Image
                  source={require("../../assets/images/chat/receivedCode.png")}
                  style={{ width: 12, resizeMode: "contain" }}
                />
              </View>
            </Shadow>
          </View>
        </View>
      )}

      <View style={[styles.textContainer, { marginHorizontal: 14 }]}>
        <Text style={styles.mediumText}>{roomTitle}</Text>
        <Text numberOfLines={1} style={styles.smallText}>
          {lastMessage}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.timeText}>{hhmm(lastAt)}</Text>
        <View style={styles.circle}>
          <Text style={styles.chatNumberText}>2</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    height: 60,
    borderRadius: 16,
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
    fontFamily: "Pretendard-Regular",
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
    alignItems: "center",
    width: "100%",
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#F4F4F4",
  },
  receivedCodeContainer: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
});

export default ChatBox;
