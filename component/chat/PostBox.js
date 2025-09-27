import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { theme } from "../../colors/color";
import { useNavigation } from "@react-navigation/native";
import { hhmm, ymd } from "../../utils/time";

const PostBox = ({ postId, title, content, date, imageUrl }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatListDetail", {
          postId,
        })
      }
      style={({ pressed }) => [
        styles.chatContainer,
        { backgroundColor: !pressed ? "#FFF" : theme.gray50 },
      ]}
    >
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../assets/images/companion/logo.png")
        }
        style={styles.img}
      />

      <View style={[styles.textContainer, { marginHorizontal: 14 }]}>
        <Text style={styles.mediumText}>{title}</Text>
        <Text numberOfLines={1} style={styles.smallText}>
          {content.replace("\n", " ")}
        </Text>
      </View>
      <Text style={styles.timeText}>{ymd(date)}</Text>
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
  img: {
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

export default PostBox;
