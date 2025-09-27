import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Shadow } from "react-native-shadow-2";
import CancleConfirmModal from "../../component/CancleConfirmModal";
import { Header } from "../../component/Header/Header";
import Out from "../../assets/icon/chat/out.svg";
import Message from "../../component/chat/Message";
import { theme } from "../../colors/color";
import { showToast } from "../../component/Toast";

export default function ChatBaseScreen({
  title,
  titleIcon,
  topicText,
  listHeaderText,
  controller,
  onPressExit,
  exitText = "방을 나가시겠습니까?",
  inputPlaceholder = "메시지를 입력하세요.",
  inputLeftButton = null,
  handleLongPress = () => {},
}) {
  const headerHeight = useHeaderHeight();
  const {
    listRef,
    messages,
    loading,
    loadingOlder,
    handleScroll,
    onSend,
    inputDisabled,
  } = controller;

  const [text, setText] = useState("");
  const [exitModalVisible, setExitModalVisible] = useState(false);

  const handleSend = useCallback(async () => {
    const payload = text.trim();
    if (!payload) return;
    const ok = await onSend(payload);
    if (ok) setText("");
    else showToast("메시지를 보낼 수 없어요. 잠시 후 다시 시도해주세요.");
  }, [text, onSend]);

  const renderItem = useCallback(
    ({ item }) => <Message item={item} handleLongPress={handleLongPress} />,
    [handleLongPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <Header title={title} titleIcon={titleIcon}>
        <TouchableOpacity onPress={() => setExitModalVisible(true)}>
          <Out width={17} height={18} />
        </TouchableOpacity>
      </Header>

      {/* 공지 배너 (옵션) */}
      {Boolean(topicText) && (
        <View style={{ padding: 20 }}>
          <Shadow
            distance={2}
            startColor="rgba(0,0,0,0.1)"
            finalColor="rgba(0,0,0,0)"
            style={{ width: "100%" }}
          >
            <View style={styles.topicContainer}>
              <Image
                source={require("../../assets/images/story/notice.png")}
                style={styles.noticeIcon}
              />
              <Text numberOfLines={2} style={styles.topicText}>
                {topicText}
              </Text>
            </View>
          </Shadow>
        </View>
      )}

      {/* 리스트 + 입력 */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => String(m.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <Text style={styles.chatStartText}>{listHeaderText}</Text>
          }
          ListFooterComponent={
            loading || loadingOlder ? (
              <ActivityIndicator style={{ marginVertical: 12 }} />
            ) : null
          }
        />

        <View style={styles.inputContainer}>
          {inputLeftButton}
          <TextInput
            placeholder={
              inputDisabled ? "대화가 종료되었어요" : inputPlaceholder
            }
            value={text}
            onChangeText={setText}
            style={styles.textInput}
            returnKeyType="send"
            onSubmitEditing={() => !inputDisabled && handleSend()}
            editable={!inputDisabled}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={inputDisabled || !text.trim()}
          >
            <Image
              source={require("../../assets/images/chat/send_button.png")}
              style={[
                styles.sendIcon,
                (inputDisabled || !text.trim()) && { opacity: 0.5 },
              ]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 나가기 모달 */}
      <CancleConfirmModal
        visible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
        text={exitText}
        onClick={async () => {
          try {
            await onPressExit?.();
          } finally {
            setExitModalVisible(false);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topicContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    gap: 7,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  noticeIcon: { width: 23, height: 23, resizeMode: "contain" },
  topicText: {
    flex: 1,
    flexShrink: 1,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: theme.main_black,
  },

  messagesContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 12,
  },
  chatStartText: {
    alignSelf: "center",
    paddingBottom: 40,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: "#6B6B6B",
    textDecorationLine: "underline",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#F4F4F4",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: "#313131",
    borderWidth: 1,
    borderColor: "#e9e9e9",
  },
  sendIcon: { width: 30, height: 30, resizeMode: "contain" },
});
