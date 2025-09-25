import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ItemCard from "../../../component/MyPage/ItemCard";
import { showToast } from "../../../component/Toast";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  loadMyCompanionPosts,
  loadMyStoryPosts,
} from "../../../api/mypage/post";
import CancleConfirmModal from "../../../component/CancleConfirmModal";
import { deleteStoryPost } from "../../../api/storyroom/room";
import { deletePost } from "../../../api/companion/post";

const Tab = createMaterialTopTabNavigator();

export default function MyPostScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
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
            alignItems: "center",
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.main_blue,
            width: 84,
            marginHorizontal: 50,
            height: 3,
          },
        }}
      >
        <Tab.Screen
          name="동행 구하기"
          component={PostListScreen}
          initialParams={{ type: "companion" }}
        />
        <Tab.Screen
          name="이야기방"
          component={PostListScreen}
          initialParams={{ type: "story" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const PostListScreen = () => {
  const route = useRoute();
  const type = route.params?.type ?? "companion";
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getEntityId = useCallback((it) => it?.id ?? it?.postId, []);

  const onAskDelete = useCallback((id) => {
    setSelectedId(id);
    setDeleteModalVisible(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!selectedId) return;
    try {
      await current.delete(selectedId);
      setList((prev) => prev.filter((it) => getEntityId(it) !== selectedId));
    } finally {
      setDeleteModalVisible(false);
      setSelectedId(null);
    }
  }, [current, selectedId, getEntityId]);

  const config = useMemo(
    () => ({
      companion: {
        load: loadMyCompanionPosts,
        delete: deletePost,
        render: (item) => {
          const id = getEntityId(item);
          return (
            <ItemCard
              item={item}
              from="companion"
              isHaveScrap={false}
              modalOptions={[
                { type: "share", text: "공유하기", onPress: () => {} },
                {
                  type: "reject",
                  text: "삭제하기",
                  color: "#f00",
                  onPress: () => onAskDelete(id),
                },
              ]}
            />
          );
        },
      },
      story: {
        load: loadMyStoryPosts,
        delete: deleteStoryPost,
        render: (item) => {
          const id = getEntityId(item);
          return (
            <ItemCard
              item={item}
              from="story"
              isHaveScrap={false}
              modalOptions={[
                { type: "share", text: "공유하기", onPress: () => {} },
                {
                  type: "reject",
                  text: "삭제하기",
                  color: "#f00",
                  onPress: () => onAskDelete(id),
                },
              ]}
            />
          );
        },
      },
    }),
    [getEntityId, onAskDelete]
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
          getEntityId(item) != null ? String(getEntityId(item)) : String(index)
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
      <CancleConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        text={`한 번 삭제한 글은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        onClick={handleDelete}
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
