import React, { useCallback, useEffect, useMemo } from "react";
import { useStoryChatRoom } from "../../hooks/useStoryChatRoom";
import { showToast } from "../../component/Toast";
import { leaveStoryRoom } from "../../api/storyroom/chat";
import { SOCKET_URL } from "@env";
import { toMMSS } from "../../utils/time";
import ChatBaseScreen from "./ChatBaseScreen";

export default function ChatStoryScreen({ route, navigation }) {
  const { roomId: displayRoomId, topicText } = route.params || {};
  const controller = useStoryChatRoom({
    roomId: displayRoomId,
    baseURL: SOCKET_URL,
  });

  useEffect(() => {
    if (controller.expired) {
      showToast("이야기방이 종료됐어요.");
      const t = setTimeout(() => navigation.goBack(), 1200);
      return () => clearTimeout(t);
    }
  }, [controller.expired, navigation]);

  const headerTitle = useMemo(
    () => `남은 시간 ${toMMSS(controller.remainSec ?? 0)}`,
    [controller.remainSec]
  );

  return (
    <ChatBaseScreen
      title={headerTitle}
      titleIcon={require("../../assets/images/story/clock.png")}
      topicText={topicText}
      listHeaderText={"이야기가 시작됐어요!"}
      controller={controller}
      onPressExit={async () => {
        try {
          await leaveStoryRoom(controller.roomId, controller.userId);
        } catch (e) {}
        navigation.goBack();
      }}
      exitText={"방을 나가시겠어요?"}
    />
  );
}
