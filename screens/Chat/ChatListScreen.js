import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import ChatBox from "../../component/chat/ChatBox";
import { useEffect, useState } from "react";
import { loadChatList } from "../../api/chat/chat";
import { useIsFocused } from "@react-navigation/native";

export default function ChatListScreen({ navigation }) {
  const [cursor, setCursor] = useState(null);
  const [rooms, setRooms] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const result = await loadChatList(cursor, 10);
        console.log("chat list: ", result);

        if (!result) return;
        if (cursor == null) setRooms(result.rooms || []);
        else setRooms((prev) => [...prev, ...(result.rooms || [])]);
      })();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => <ChatBox item={item} />}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "#F4F4F4",
    borderTopWidth: 1,
  },
});
