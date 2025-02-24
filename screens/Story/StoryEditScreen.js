import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import Close from "../../assets/icon/story/close_blue.svg";
import DropDown from "../../assets/icon/story/dropdown.svg";
import { useState } from "react";

export default function StoryEditScreen() {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <SafeAreaView style={theme.container}>
      {/* Header */}
      <Header title="작성하기" right="none" />
      <View style={styles.editContainer}>
        {/* notice */}
        <TouchableOpacity style={styles.noticeContainer}>
          <View
            style={[
              theme.rowContainer,
              { width: "100%", justifyContent: "space-between" },
            ]}
          >
            <Text style={styles.noticeTitle}>
              글을 작성하기 전에 알려드려요.
            </Text>

            <Close style={{ marginRight: 4 }} />
          </View>
          <Text style={styles.noticeText}>
            타인에게 불쾌감과 모욕감을 주는 내용의 글은 올릴 수 없으며, 법령을
            위반한 게시물은 관련 법률에 따라 처벌받을 수 있습니다.
          </Text>
        </TouchableOpacity>
        {/* filter button */}
        <View
          style={[
            theme.rowContainer,
            {
              width: "100%",
              gap: 10,
              marginBottom: 24,
            },
          ]}
        >
          <Pressable
            onPress={() => console.log("버튼")}
            style={({ pressed }) => [
              styles.filterButton,
              { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
            ]}
          >
            <Text style={styles.filterButtonText}>일상</Text>
            <DropDown style={styles.dropdown} />
          </Pressable>
          <Pressable
            onPress={() => console.log("버튼")}
            style={({ pressed }) => [
              styles.filterButton,
              { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
            ]}
          >
            <Text style={styles.filterButtonText}>제한 시간</Text>
            <DropDown style={styles.dropdown} />
          </Pressable>
        </View>
        {/* edit */}
        <TextInput
          placeholder="나누고 싶은 이야기를 입력해주세요.\n(모든 이야기는 익명으로 나누지만, 타인에게 불쾌감과 모욕감을 주는 이야기로 신고가 들어온 경우 자동으로 숨김 처리 될 수 있습니다)"
          multiline={true}
          style={styles.textinput}
        />
        {/* confirm button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.5}
            onPress={() => {}}
            style={[
              styles.button,
              isDisabled && { backgroundColor: "#F3F3F3" },
            ]}
          >
            <Text
              style={[styles.buttonText, isDisabled && { color: "#B8B8B8" }]}
            >
              완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 2,
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  noticeContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#0084FF10",
    marginBottom: 16,
  },
  noticeTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    color: theme.main_blue,
    marginBottom: 2,
  },
  noticeText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 13,
    color: theme.main_blue,
  },
  // filter button
  filterButton: {
    flexDirection: "row",
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    paddingHorizontal: 18,
  },
  filterButtonText: {
    fontSize: 15,
    fontFamily: "Pretendard-SemiBold",
    color: theme.main_black,
  },
  dropdown: { position: "absolute", right: 18, top: "50%" - 10 },
  // input
  textinput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "left",
    lineHeight: 10,
  },
  // confirm button
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 38,
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
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
    color: "white",
  },
});
