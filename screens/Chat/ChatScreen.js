import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import CancleConfirmModal from "../../component/CancleConfirmModal";
import { Header } from "../../component/Header/Header";
import Out from "../../assets/icon/chat/out.svg";
import { SOCKET_URL } from "@env";
import { showToast } from "../../component/Toast";
import { leaveChat, createGroupChat, joinByInvite } from "../../api/chat/chat";
import Message from "../../component/chat/Message";
import { useChatRoom } from "../../hooks/useChatRoom";

const INVITE_RE = /\[초대 코드\]([A-Za-z0-9]+)/;

export default function ChatScreen({ navigation, route }) {
  const {
    postId,
    initialRoomId = null,
    peerName = "상대 닉네임",
  } = route.params || {};

  const headerHeight = useHeaderHeight();

  const [text, setText] = useState("");
  const [inviteCode, setInviteCode] = useState(null);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [moveToModalVisible, setMoveToModalVisible] = useState(false);

  const {
    listRef,
    userId,
    roomId,
    setRoomId,
    isGroup,
    isOwner,
    messages,
    loading,
    loadingOlder,
    onSend,
    handleScroll,
  } = useChatRoom({ initialRoomId, postId, baseURL: SOCKET_URL });

  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    if (sending) return;
    setSending(true);
    const ok = await onSend(text);
    if (ok) setText("");
    else showToast("메시지를 보낼 수 없어요. 잠시 후 다시 시도해주세요.");
    setSending(false);
  }, [text, onSend, sending]);

  const handleLongPress = useCallback((item) => {
    if (!item?.text) return;
    const m = item.text.match(INVITE_RE);
    if (m) {
      const code = m[1];
      setInviteCode(code);
      setMoveToModalVisible(true);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }) => <Message item={item} handleLongPress={handleLongPress} />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Header title={!isGroup ? peerName : "그룹 대화방"}>
        <TouchableOpacity onPress={() => setExitModalVisible(true)}>
          <Out width={17} height={18} />
        </TouchableOpacity>
      </Header>

      {/* messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m, i) =>
            (m.id ??
              `${m.createdAt ?? ""}|${m.senderId ?? ""}|${m.text ?? ""}`) +
            "-" +
            i
          }
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <Text style={styles.chatStartText}>
              {peerName}님과의 대화가 시작되었습니다.
            </Text>
          }
          ListFooterComponent={
            loading || loadingOlder ? (
              <ActivityIndicator style={{ marginVertical: 12 }} />
            ) : null
          }
        />

        {/* input */}
        <View style={styles.inputContainer}>
          {isOwner && !isGroup && (
            <TouchableOpacity
              onPress={() => {
                setInviteModalVisible(true);
              }}
              style={styles.sendButton}
            >
              <Image
                source={require("../../assets/images/chat/receivedCode.png")}
                style={{ width: 19, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          )}

          <TextInput
            placeholder="메시지를 입력하세요."
            value={text}
            onChangeText={setText}
            style={styles.textInput}
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
          />

          <TouchableOpacity onPress={handleSend}>
            <Image
              source={require("../../assets/images/chat/send_button.png")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <CancleConfirmModal
        visible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
        text={`방을 나가는 동시에${"\n"}모든 대화 기록이 삭제됩니다.`}
        onClick={async () => {
          await leaveChat(roomId);
          navigation.pop();
        }}
      />
      <CancleConfirmModal
        visible={inviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        text={`동행 구하기 단체 톡방${"\n"}초대 코드를 발송합니다.`}
        onClick={async () => {
          if (!userId) {
            showToast("잠시 후 다시 시도해주세요.");
            return;
          }

          const result = await createGroupChat(postId, userId);
          if (result?.inviteCode) {
            const msg = `[초대 코드]${
              result.inviteCode
            }${"\n"}말풍선을 꾹 눌러서 입장하세요!`;
            const ok = await onSend(msg);
            if (ok) setInviteModalVisible(false);
          } else {
            showToast("초대 코드 생성 실패! 잠시 후 다시 시도해주세요.");
          }
        }}
      />
      <CancleConfirmModal
        visible={moveToModalVisible}
        onClose={() => setMoveToModalVisible(false)}
        text={`${peerName}님으로부터 초대 코드가 왔습니다!${"\n"} 톡방으로 이동할까요?`}
        onClick={async () => {
          try {
            const res = await joinByInvite(inviteCode, userId);
            // 백엔드가 roomId를 반환한다면 여기서 사용하세요.
            // 예: setRoomId(res.roomId); or navigation.replace("Chat", { initialRoomId: res.roomId, peerName: "그룹" })
            setMoveToModalVisible(false);
          } catch {
            showToast("입장에 실패했어요. 초대코드를 확인해주세요.");
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  // 입력창
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
  sendButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    backgroundColor: "#fff",
  },
  sendIcon: { width: 30, height: 30, resizeMode: "contain" },
});
