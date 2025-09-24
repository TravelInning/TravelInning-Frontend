import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import PlaceCard from "../../../component/Home/PlaceCard";
import ItemCard from "../../../component/MyPage/ItemCard";
import { showToast } from "../../../component/Toast";
import { loadScrapPlaces } from "../../../api/place/scrap";
import { loadScrapPosts } from "../../../api/companion/scrap";
import { loadScrapStoryRooms } from "../../../api/storyroom/scrap";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function MyScrapScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
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
          initialParams={{ type: "place" }}
        />
        <Tab.Screen
          name="동행 구하기"
          component={ScrapScreen}
          initialParams={{ type: "companion" }}
        />
        <Tab.Screen
          name="이야기방"
          component={ScrapScreen}
          initialParams={{ type: "story" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const ScrapScreen = () => {
  const route = useRoute();
  const type = route.params?.type ?? "place";
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const config = useMemo(
    () => ({
      place: {
        load: loadScrapPlaces,
        render: (item) => (
          <PlaceCard
            place={item}
            modalOptions={[
              { type: "share", text: "공유하기", onPress: () => {} },
            ]}
          />
        ),
      },
      companion: {
        load: loadScrapPosts,
        render: (item) => (
          <ItemCard
            item={item}
            from="companion"
            isHaveScrap={true}
            modalOptions={[
              { type: "share", text: "공유하기", onPress: () => {} },
            ]}
          />
        ),
      },
      story: {
        load: loadScrapStoryRooms,
        render: (item) => (
          <ItemCard
            item={item}
            from="story"
            isHaveScrap={true}
            modalOptions={[
              { type: "share", text: "공유하기", onPress: () => {} },
            ]}
          />
        ),
      },
    }),
    []
  );

  const current = config[type];

  const fetchData = useCallback(async () => {
    try {
      const data = await current.load();
      if (data) setList(data);
    } catch (e) {
      console.log("load error: ", e);
      showToast("로드 오류 발생!");
    }
  }, [current]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const renderItem = useCallback(({ item }) => current.render(item), [current]);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id != null ? String(item.id) : String(index)
        }
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
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
