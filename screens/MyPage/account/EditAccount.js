import { SafeAreaView, StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../colors/color";
import { useState } from "react";
import { Header } from "../../../component/Header/Header";
import CancleConfirmModal from "../../../component/CancleConfirmModal";
import { EditProfileNavBtn } from "../../../component/MyPage/Profile/EditProfileNavBtn";

export default function EditAccount({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={theme.container}>
      <Header title="계정" />
      <View style={styles.container}>
        <EditProfileNavBtn
          title={"비밀번호 재설정"}
          content={""}
          navFunc={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <CancleConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        text={`비밀번호 재설정 시\n재로그인이 필요합니다.`}
        onClick={() => navigation.reset("FindEmail")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 23,
    paddingVertical: 30,
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
  deleteAccount: {
    fontFamily: "Pretendard-Regular",
    fontSize: 18,
    color: "#f00",
  },
});
