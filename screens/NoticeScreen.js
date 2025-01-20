import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
import Left from "../assets/icon/left_arrow.svg";
import { theme } from "../colors/color";
import { useState } from "react";
import NoticeCard from "../component/NoticeCard";
import CancleConfirmModal from "../component/CancleConfirmModal";

export default function NoticeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("알림");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={theme.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ width: 40 }}
        >
          <Left width={8} height={15} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Pretendard-SemiBold",
            color: theme.main_black,
          }}
        >
          알림센터
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ width: 40 }}
        >
          <Text style={[styles.smallBoldText, { color: theme.main_blue }]}>
            모두 확인
          </Text>
        </TouchableOpacity>
      </View>
      {/* 카테고리 */}
      <View
        style={{
          ...styles.header,
          paddingHorizontal: 30,
          borderColor: "#F4F4F4",
        }}
      >
        {["알림", "공지사항", "이벤트"].map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
              }}
              style={[
                styles.categoryBtn,
                selectedCategory === category && {
                  borderColor: theme.main_blue,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && {
                      color: theme.main_blue,
                      fontFamily: "Pretendard-Medium",
                    },
                  ]}
                >
                  {category}
                </Text>
                {/* 안읽은거 있을때만 보일거 */}
                <View
                  style={{
                    position: "absolute",
                    right: -4,
                    top: 2,
                    width: 3,
                    height: 3,
                    backgroundColor: theme.main_blue,
                    borderRadius: 30,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* 컨텐츠 */}
      <FlatList
        data={[true, false]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <NoticeCard isRead={item} />;
        }}
      />
      <CancleConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        text={`읽지 않은 알림이 있습니다.${"\n"}모두 확인 처리를 하시겠습니까?`}
        onClick={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#D6D6D6",
  },
  smallBoldText: {
    fontSize: 10,
    fontFamily: "Pretendard-SemiBold",
  },
  categoryText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    color: "#2A2A2A",
  },
  categoryBtn: {
    width: 84,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderColor: "#fff",
  },
});
