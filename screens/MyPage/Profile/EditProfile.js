import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../../component/Header/Header";
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../colors/color";
import { showToast } from "../../../component/Toast";
import { ConfirmBtn } from "../../../component/MyPage/Profile/ConfirmBtn";
import { EditProfileNavBtn } from "../../../component/MyPage/Profile/EditProfileNavBtn";

const title = ["닉네임", "성별", "소개 메시지"];

export default function EditProfile({ navigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <Header title="프로필 변경" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../../assets/images/gowith/logo.png")}
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <Text style={styles.profileImgText}>프로필 이미지</Text>
        </TouchableOpacity>
        <View style={styles.btnGroup}>
          {title.map((text, index) => (
            <EditProfileNavBtn
              key={index}
              title={text}
              content="Jihye"
              navFunc={() => {
                navigation.navigate("EditDetail", { title: text });
              }}
            />
          ))}
        </View>
      </ScrollView>
      <ConfirmBtn
        confirmFunc={() => {
          showToast("저장 완료!");
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 23,
    alignItems: "center",
  },
  profileImage: {
    width: SCREEN_HEIGHT / 8,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: SCREEN_WIDTH / 10,
    marginBottom: 20,
  },
  profileImgText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: theme.main_blue,
    borderBottomWidth: 1,
    borderBottomColor: theme.main_blue,
    marginBottom: 40,
  },
  btnGroup: {
    width: "100%",
    gap: 20,
  },
});
