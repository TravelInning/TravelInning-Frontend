import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../../colors/color";
import { useNavigation } from "@react-navigation/native";

export function AloneChatBox() {
  const navigation = useNavigation();

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ borderRadius: 20 }}
    >
      <Pressable
        onPress={() => navigation.navigate("Chat")}
        style={({ pressed }) => [
          styles.boxContainer,
          { backgroundColor: !pressed ? "#FFF" : theme.gray50 },
        ]}
      >
        <Image
          source={require("../../assets/images/selectphoto/photo1.png")}
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
      </Pressable>
    </Shadow>
  );
}

export function GroupChatBox() {
  const images = [
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
    require("../../assets/images/selectphoto/photo1.png"),
  ];

  const navigation = useNavigation();

  return (
    <Shadow
      distance={2}
      startColor="rgba(0, 0, 0, 0.1)"
      finalColor="rgba(0, 0, 0, 0)"
      style={{ borderRadius: 20 }}
    >
      <Pressable
        onPress={() => navigation.navigate("Chat")}
        style={({ pressed }) => [
          styles.boxContainer,
          { backgroundColor: !pressed ? "#FFF" : theme.gray50 },
        ]}
      >
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
      </Pressable>
    </Shadow>
  );
}

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
