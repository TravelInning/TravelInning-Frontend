import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { theme } from "../colors/color";

export default function NoticeCard({ isRead }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log("보러가기")}
      style={{
        width: "100%",
        height: 100,
        paddingLeft: 35,
        paddingRight: 30,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderColor: "#F4F4F4",
        backgroundColor: isRead ? "#fff" : "#EFF7FF",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/images/noticeIcon/chat.png")}
            style={{
              width: 16,
              aspectRatio: 1,
              resizeMode: "contain",
              marginRight: 5,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Pretendard-SemiBold",
                color: theme.main_black,
                marginBottom: 2,
              }}
            >
              동행찾기
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Pretendard-Bold",
                color: theme.main_black,
                marginBottom: 2,
              }}
            >
              내 글에 댓글이 달렸어요!
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Pretendard-Regular",
                color: "#545454",
                marginBottom: 8,
              }}
            >
              동행 아직 구하시나요?
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Pretendard-Regular",
                color: "#979797",
              }}
            >
              보러가기
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Pretendard-Regular",
            color: isRead ? "#979797" : theme.main_blue,
          }}
        >
          • 1일 전
        </Text>
      </View>
    </TouchableOpacity>
  );
}
