import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CompCard } from "../../component/MyPage/PrivacySettingComp";

const Tab = createMaterialTopTabNavigator();

export default function MyScrapScreen({ navigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <Header title="스크랩" />
      <Tab.Navigator
        initialRouteName={"추천 장소"}
        screenOptions={{
          tabBarActiveTintColor: theme.main_blue,
          tabBarInactiveTintColor: "#C2C2C2",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Pretendard-Medium",
            width: "100%",
          },
          tabBarStyle: {
            width: "100%",
            height: 48,
            shadowOpacity: 0,
            elevation: 0,
            backgroundColor: "transparent",
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.main_blue,
            width: 84,
            marginHorizontal: 20,
            height: 3,
          },
        }}
      >
        <Tab.Screen
          name="추천 장소"
          component={ScrapScreen}
          options={{ tabBarLabel: "추천 장소" }}
        />
        <Tab.Screen
          name="동행 구하기"
          component={ScrapScreen}
          options={{ tabBarLabel: "동행 구하기" }}
        />
        <Tab.Screen
          name="이야기방"
          component={ScrapScreen}
          options={{ tabBarLabel: "이야기방" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const ScrapScreen = () => {
  const route = useRoute();
  const tabName = route.name;
  const [list, setList] = useState([0]);

  // 선택 탭에 따라 list 렌더링
  useState(() => {}, []);

  const renderItem = ({ item }) => {
    if (tabName === "추천 장소") {
      return (
        <CompCard
          title="용호만 유람선 터미널"
          content="광안대교나 오륙도를 구경하는 코스로 요트를 타볼 수ㅜ 있느느느느느느느느느ㅡㄴㄴ"
          distance="13"
          photo={require("../../assets/images/selectphoto/photo1.png")}
          from="place"
          isScrap={true}
        />
      );
    } else if (tabName === "이야기방") {
      return (
        <CompCard
          category="야구"
          content="한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니니닌까ㅏ깎 "
          date="25.02.28"
          photo={require("../../assets/images/gowith/logo.png")}
          from="story"
          isScrap={true}
        />
      );
    } else {
      return (
        <CompCard
          title="게시글 제목 예를 들면 ㅇㅇㅇㅇ"
          content="삼성vskia 경기 보러갈건데요.
  같은 ㄴ성별만 원하는데요. ㅇㅇㅇㅇㅇ"
          date="11.01"
          nickname="최강삼성"
          photo={require("../../assets/images/gowith/logo.png")}
          from="gowith"
          isScrap={true}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>목록 없음</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: list.length === 0 ? 1 : undefined,
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 24,
          gap: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: theme.borderColor,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#919191",
    paddingBottom: 50,
  },
});
