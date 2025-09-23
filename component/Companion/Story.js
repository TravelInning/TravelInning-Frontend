import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { theme } from "../../colors/color";
import { useNavigation } from "@react-navigation/native";

const Story = ({ item }) => {
  const navigation = useNavigation();

  const { id, title, thumbnailUrl, scraped, createdAt, status } = item;
  // const state = "inProgress"; // inProgress, done, ended

  const goDetail = () => {
    navigation.navigate("CompanionPostDetail", { id, scraped, createdAt });
  };

  return (
    <Pressable
      onPress={goDetail}
      android_ripple={{ radius: 300 }}
      style={{ alignItems: "center" }}
    >
      <View>
        <Image
          source={
            thumbnailUrl
              ? { uri: thumbnailUrl }
              : require("../../assets/images/companion/logo_circle.png")
          }
          style={styles.circle}
        />
        {status === "FOUND" && (
          <View
            style={{
              ...styles.circle,
              position: "absolute",
              backgroundColor: "#00000050",
            }}
          >
            <Text style={styles.postendText}>게시 종료</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyText}>{title && title.slice(0, 6)}...</Text>
      <View
        style={[
          styles.miniCircle,
          {
            backgroundColor:
              status === "FINDING"
                ? theme.main_blue
                : status === "FOUND"
                ? "transperant"
                : "#545454",
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 30,
  },
  storyText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    color: theme.main_black,
  },
  miniCircle: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 30,
    position: "absolute",
    top: 0,
    right: 4,
  },
  postendText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    color: "#FFF",
  },
});

export default Story;
