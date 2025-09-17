import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import ItemCard from "../../../component/MyPage/ItemCard";

const Tab = createMaterialTopTabNavigator();

export default function MyPostScreen({ navigation }) {
  return (
    <SafeAreaView style={theme.container}>
      <Header title="작성글" />
      <Tab.Navigator
        initialRouteName={"동행 구하기"}
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
            height: 3,
            marginLeft: 52,
          },
        }}
      >
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
    if (tabName === "동행 구하기") {
      return (
        <ItemCard
          item={item}
          from="companion"
          isHaveScrap={false}
          modalOptions={[
            {
              type: "reset",
              text: "차단 해제하기",
              color: theme.main_blue,
              onPress: () => handleCancelPostBlock(item.id),
            },
          ]}
        />
      );
    } else {
      return (
        <ItemCard
          item={item}
          from="story"
          isHaveScrap={false}
          modalOptions={[
            {
              type: "reset",
              text: "차단 해제하기",
              color: theme.main_blue,
              onPress: () => handleCancelPostBlock(item.id),
            },
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
