import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../colors/color";
import { useNavigation } from "@react-navigation/native";
import { hhmm } from "../../utils/time";

const ChatBox = ({ item }) => {
  const navigation = useNavigation();

  const {
    roomId,
    group,
    postId,
    participants,
    opponentName,
    participantProfileImages,
    lastMessage,
    lastAt,
    unreadCount,
  } = item;

  const images = participantProfileImages.slice(0, 4);
  while (images.length < 4) {
    images.push(null);
  }

  console.log("participantProfileImages: ", participantProfileImages);

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ borderRadius: 20 }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("ChatCompanion", {
            initialRoomId: roomId,
            postId,
            peerName: "",
          })
        }
        style={({ pressed }) => [
          styles.boxContainer,
          { backgroundColor: !pressed ? "#FFF" : theme.gray50 },
        ]}
      >
        {group && participantProfileImages?.length > 0 ? (
          <View style={styles.imageGrid}>
            {images.map((url, index) => (
              <Image
                key={index}
                source={
                  url
                    ? { uri: url }
                    : require("../../assets/images/chat/base_profile.png")
                }
                style={styles.groupImg}
              />
            ))}
          </View>
        ) : (
          <Image
            source={
              participantProfileImages?.[1]
                ? { uri: participantProfileImages[1] }
                : require("../../assets/images/chat/base_profile.png")
            }
            style={styles.aloneImg}
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.mediumText}>
            {!group ? `${opponentName}와의 1:1 채팅` : "단체대화방"}
          </Text>
          <Text numberOfLines={1} style={styles.smallText}>
            {lastMessage}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.timeText}>{hhmm(lastAt)}</Text>
          <View
            style={[
              styles.circle,
              !unreadCount && { backgroundColor: "transparent" },
            ]}
          >
            <Text style={styles.chatNumberText}>{unreadCount}</Text>
          </View>
        </View>
      </Pressable>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
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
    justifyContent: "center",
    alignItems: "center",
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
