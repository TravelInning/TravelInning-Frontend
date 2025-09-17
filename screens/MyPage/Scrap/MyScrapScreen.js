import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceCard from "../../../component/Home/PlaceCard";
import ItemCard from "../../../component/MyPage/ItemCard";
import { showToast } from "../../../component/Toast";
import { loadScrapPlaces } from "../../../api/place/scrap";
import { loadScrapPosts } from "../../../api/companion/scrap";

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
  const [list, setList] = useState([]);

  useState(() => {
    try {
      if (tabName === "추천 장소") {
        loadPlaces();
      } else if (tabName === "동행 구하기") {
        loadPosts();
      } else {
      }
    } catch (error) {
      console.log("load error: ", error);
      showToast("로드 오류 발생!");
    }
  }, []);

  async function loadPlaces() {
    const data = await loadScrapPlaces();
    if (data) {
      setList(data);
    }
  }

  async function loadPosts() {
    const data = await loadScrapPosts();
    if (data) {
      setList(data);
    }
  }

  const renderItem = ({ item }) => {
    if (tabName === "추천 장소") {
      return (
        <PlaceCard
          place={item}
          modalOptions={[
            { type: "share", text: "공유하기", onPress: () => {} },
          ]}
        />
      );
    } else if (tabName === "동행 구하기") {
      return (
        <ItemCard
          item={item}
          from="companion"
          isHaveScrap={true}
          modalOptions={[
            { type: "share", text: "공유하기", onPress: () => {} },
          ]}
        />
      );
    } else {
      return (
        <ItemCard
          item={item}
          from="story"
          isHaveScrap={true}
          modalOptions={[
            { type: "share", text: "공유하기", onPress: () => {} },
          ]}
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
