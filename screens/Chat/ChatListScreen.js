import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { loadChatList, loadPostLists } from "../../api/chat/chat";
import { useIsFocused } from "@react-navigation/native";
import PostBox from "../../component/chat/PostBox";

export default function ChatListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const result = await loadPostLists();

        if (!result) return;
        setPosts(result);
      })();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.postId)}
        renderItem={({ item }) => (
          <PostBox
            postId={item.postId}
            title={item.title}
            content={item.content}
            date={item.createdAt}
            imageUrl={item.thumbnailUrl}
          />
        )}
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
