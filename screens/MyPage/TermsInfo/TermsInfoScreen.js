import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import Arrow from "../../../assets/icon/mypage/right_arrow_gray.svg";

export default function TermsInfoScreen({ navigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <Header title="정보" />
      <View style={styles.container}>
        {["이용약관", "개인정보 정책", "프로모션 정보 수신"].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("TermsInfoDetail", {
                  title: item,
                })
              }
              style={styles.rowContainer}
            >
              <Text style={styles.subTitle}>{item}</Text>
              <Arrow width={14} height={12} />
            </TouchableOpacity>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
    paddingHorizontal: 20,
  },
  subTitle: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: theme.main_black,
  },
});
