import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { theme } from "../../colors/color";
import { ChatListBox } from "../../component/ChatComp";

export default function ChatListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ChatListBox
        isWriter={true}
        isGroup={false}
        isNewChat={true}
        title="게시글 제목"
        content="동행 신청합니당!(새로 온 채팅 내용)"
        time="19:25"
      />
      <ChatListBox
        isWriter={false}
        isGroup={true}
        isNewChat={false}
        title="게시글제목입니다다"
        content="너무 즐거웠습니당(마지막 채팅 내용)"
        time="19:26"
      />
      {/* <FlatList
        data={[0, 1, 2]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <ChatListBox title="ggggggg"/>;
        }}
        style={{ flex: 1 }}
      /> */}
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
