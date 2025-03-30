import { SafeAreaView, StyleSheet, View } from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";

export default function PrivacySettingsScreen({ naivigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <Header title="개인정보 보호" />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
