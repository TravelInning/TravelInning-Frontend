import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "상대 닉네임", text: "안녕하세요!", time: "12:35" },
    { id: 2, sender: "상대 닉네임", text: "같이 여행가고 싶어서 연락드렸어요~", time: "12:35" },
    { id: 3, sender: "me", text: "아, 네~ 안녕하세요!", time: "12:45" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "me", text: newMessage, time: getCurrentTime() },
      ]);
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/chat/back_arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>상대 닉네임</Text>
        <Image
          source={require("../../assets/images/chat/out.png")}
          style={styles.shareIcon}
        />
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer}>
        <Text style={styles.chatStartText}>
          상대 닉네임님과의 대화가 시작되었습니다.
        </Text>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === "me" ? styles.myMessageContainer : styles.otherMessageContainer,
            ]}
          >
            {message.sender !== "me" && (
              <Image
                source={require("../../assets/images/chat/test.png")}
                style={styles.userIcon}
              />
            )}
            <View
              style={[
                styles.messageBubble,
                message.sender === "me" ? styles.myMessageBubble : styles.otherMessageBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === "me" ? styles.myMessageText : styles.otherMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          placeholder="메시지를 입력하세요."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image
            source={require("../../assets/images/chat/send_button.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#D5D5D5",
  },
  backIcon: {
    width: 8,
    height: 15,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    color: "#1B1D28",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareIcon: {
    width: 16,
    height: 18,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatStartText: {
    color: "#6A6A6A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  myMessageContainer: {
    flexDirection: "row-reverse",
  },
  otherMessageContainer: {
    flexDirection: "row",
  },
  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 7,
    marginRight: 6,
  },
  messageBubble: {
    maxWidth: width * 0.6,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    elevation: 2,
  },
  myMessageBubble: {
    backgroundColor: "#0083FF",
  },
  otherMessageBubble: {
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#303030",
  },
  messageTime: {
    fontSize: 10,
    color: "#B8B8B8",
    marginHorizontal: 6,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#303030",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0083FF",
    borderRadius: 20,
    padding: 10,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});