import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WriteButton } from "../../component/GoWith/GoWithComp";
import { SCREEN_WIDTH, theme } from "../../colors/color";
import { useEffect, useRef, useState } from "react";
import { StoryBox } from "../../component/Story/StoryComp";
import Carousel from "react-native-snap-carousel";

export default function StoryScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* top3 */}
      <View style={styles.topContainer}>
        {/* story box */}
        <StoryBox
          category="야구"
          time="11분 전"
          content="한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니까 앞으로 잘 하면 될거같은데"
          limitedTime="14:59"
          photo={require("../../assets/images/gowith/logo.png")}
        />
      </View>
      {/* write button */}
      <WriteButton onClick={() => navigation.navigate("StoryEdit")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    padding: 20,
    borderColor: theme.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  dot: { width: 6, height: 6, borderRadius: 30, backgroundColor: "#EDEDED" },
});
