import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../colors/color";
import BaseballOn from "../../assets/icon/onboarding/baseball_on.svg";
import BaseballOff from "../../assets/icon/onboarding/baseball_off.svg";

export default function Onboarding({ navigaiton }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.jump}>건너뛰기</Text>
        <View style={styles.indicator}>
          <BaseballOn width={8} height={8} />
          <BaseballOff width={8} height={8} />
          <BaseballOff width={8} height={8} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginBottom: 34,
  },
  jump: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    color: theme.main_blue,
  },
  indicator: {
    flexDirection: "row",
    gap: 12,
  },
});
