import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { SCREEN_WIDTH, theme } from "../../colors/color";

const Message = ({ item, handleLongPress }) => {
  const isLeft = item.side === "left";
  const isSystem = item.text?.startsWith("[SYSTEM]");

  if (isSystem) {
    return <Text style={styles.chatStartText}>{item.text}</Text>;
  }

  return (
    <View style={{ marginBottom: item.marginBottom }}>
      {isLeft && item.showPeerHeader && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Image
            source={require("../../assets/images/companion/logo.png")}
            style={styles.userIcon}
          />
          <Text style={{ fontFamily: "Pretendard-SemiBold", fontSize: 12 }}>
            {item.senderName || "상대 닉네임"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => handleLongPress(item)}
        delayLongPress={250}
        style={[styles.row, isLeft ? styles.rowLeft : styles.rowRight]}
      >
        {isLeft ? (
          <>
            <Shadow
              distance={2}
              startColor="rgba(0,0,0,0.1)"
              finalColor="rgba(0,0,0,0)"
            >
              <View style={[styles.messageBubble, styles.otherMessageBubble]}>
                <Text style={[styles.messageText, styles.otherMessageText]}>
                  {item.fromBlockedUser
                    ? "차단된 사용자 메시지입니다"
                    : item.text}
                </Text>
              </View>
            </Shadow>
            {item.isGroupEnd && (
              <Text style={[styles.messageTime, { marginLeft: 6 }]}>
                {item.time}
              </Text>
            )}
          </>
        ) : (
          <>
            {item.isGroupEnd && (
              <Text style={[styles.messageTime, { marginRight: 6 }]}>
                {item.time}
              </Text>
            )}
            <Shadow
              distance={2}
              startColor="rgba(0,0,0,0.1)"
              finalColor="rgba(0,0,0,0)"
            >
              <View style={[styles.messageBubble, styles.myMessageBubble]}>
                <Text style={[styles.messageText, styles.myMessageText]}>
                  {item.text}
                </Text>
              </View>
            </Shadow>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chatStartText: {
    alignSelf: "center",
    paddingBottom: 40,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: "#6B6B6B",
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rowLeft: { justifyContent: "flex-start" },
  rowRight: { justifyContent: "flex-end" },

  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 7,
    marginRight: 5,
    resizeMode: "cover",
  },

  messageBubble: {
    maxWidth: SCREEN_WIDTH * 0.7,
    padding: 10,
    borderRadius: 10,
  },
  myMessageBubble: { backgroundColor: theme.main_blue },
  otherMessageBubble: { backgroundColor: "#FFFFFF" },

  messageText: { fontSize: 14, fontFamily: "Pretendard-Medium" },
  myMessageText: { color: "#FFFFFF" },
  otherMessageText: { color: "#303030" },

  messageTime: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
    color: "#B8B8B8",
  },
});

export default Message;
