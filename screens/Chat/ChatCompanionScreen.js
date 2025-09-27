import React, { useCallback, useMemo, useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import CancleConfirmModal from "../../component/CancleConfirmModal";
import { SOCKET_URL } from "@env";
import { showToast } from "../../component/Toast";
import { leaveChat, createGroupChat, joinByInvite } from "../../api/chat/chat";
import { useChatRoom } from "../../hooks/useChatRoom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatBaseScreen from "./ChatBaseScreen";

const INVITE_RE = /\[초대 코드\]([A-Za-z0-9]+)/;

export default function ChatCompanionScreen({ navigation, route }) {
  const {
    postId,
    initialRoomId = null,
    peerName = "상대 닉네임",
  } = route.params || {};
  const controller = useChatRoom({
    initialRoomId,
    postId,
    baseURL: SOCKET_URL,
  });

  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [moveToModalVisible, setMoveToModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);

  const headerTitle = useMemo(
    () => (!controller.isGroup ? peerName : "그룹 대화방"),
    [controller.isGroup, peerName]
  );

  const handleLongPress = useCallback((item) => {
    if (!item?.text) return;
    const m = item.text.match(INVITE_RE);
    if (m) {
      setInviteCode(m[1]);
      setMoveToModalVisible(true);
    }
  }, []);

  const sendInviteCode = async () => {
    const userId = controller.userId;
    if (!userId) {
      showToast("잠시 후 다시 시도해주세요.");
      return;
    }
    const data = await createGroupChat(postId, controller.userId);

    if (data?.isSuccess) {
      if (!data?.result?.inviteCode) return;
      const msg = `[초대 코드]${
        data.result.inviteCode
      }${"\n"}말풍선을 꾹 눌러서 입장하세요!`;
      const ok = await controller.onSend(msg);
      if (ok) setInviteModalVisible(false);
    } else {
      if (data?.code === "CONFLICT") {
        // const msg = `[초대 코드]${
        //   data.result.inviteCode
        // }${"\n"}말풍선을 꾹 눌러서 입장하세요!`;
        // const ok = await onSend(msg);
        // if (ok) setInviteModalVisible(false);
      } else {
        showToast(data?.message);
      }
    }
  };

  const moveToGroupRoom = async () => {
    try {
      const userId = controller.userId;
      const data = await joinByInvite(inviteCode, userId);
      if (data?.isSuccess) {
        navigation.replace("Chat", {
          initialRoomId: data?.result.result,
          peerName: "그룹 대화방",
          postId,
        });
      } else {
        showToast(data?.message);
      }
      setMoveToModalVisible(false);
    } catch {
      showToast("입장에 실패했어요. 초대코드를 확인해주세요.");
    }
  };

  return (
    <>
      <ChatBaseScreen
        title={headerTitle}
        listHeaderText={`${peerName}님과의 대화가 시작되었습니다.`}
        controller={controller}
        onPressExit={async () => {
          const userName = await AsyncStorage.getItem("userName");
          const text = `[SYSTEM] ${userName}님이 대화방을 나갔습니다.`;
          await controller.onSend(text);
          await leaveChat(controller.roomId);
          navigation.pop();
        }}
        exitText={`방을 나가는 동시에${"\n"}모든 대화 기록이 삭제됩니다.`}
        inputLeftButton={
          controller.isOwner && !controller.isGroup ? (
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
          ) : null
        }
        handleLongPress={handleLongPress}
      />

      <CancleConfirmModal
        visible={inviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        text={`동행 구하기 단체 톡방${"\n"}초대 코드를 발송합니다.`}
        onClick={sendInviteCode}
      />
      <CancleConfirmModal
        visible={moveToModalVisible}
        onClose={() => setMoveToModalVisible(false)}
        text={`${peerName}님으로부터 초대 코드가 왔습니다!${"\n"} 톡방으로 이동할까요?`}
        onClick={moveToGroupRoom}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
});
