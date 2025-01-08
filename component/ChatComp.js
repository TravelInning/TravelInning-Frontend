import { StyleSheet, View, Text, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { theme } from "../colors/color";

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
});
