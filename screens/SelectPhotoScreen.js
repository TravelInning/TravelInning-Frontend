import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { theme } from "../colors/color";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function SelectPhotoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 30 }}
      >
        <Text style={styles.text}>
          <Text style={{ color: theme.main_blue }}>마음에 드는</Text>
          <Text> 사진 </Text>
          <Text style={{ color: theme.main_blue }}>5장을</Text>
        </Text>
        <Text style={styles.text}>골라주세요!</Text>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          //   bottom: 90,
          bottom: SCREEN_HEIGHT / 9,
          left: 0,
          right: 0,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    color: "#000",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    borderRadius: 9,
    backgroundColor: theme.main_blue,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Pretendard-Bold",
    color: "white",
  },
});
