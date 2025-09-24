import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ItemCard from "../../../component/MyPage/ItemCard";
import PlaceCard from "../../../component/Home/PlaceCard";
import { cancelPlaceBlock, loadBlockedPlaces } from "../../../api/place/block";
import {
  cancelPostBlock,
  loadBlockedPosts,
} from "../../../api/companion/block";
import {
  cancelStoryPostBlock,
  loadBlockedStoryRooms,
} from "../../../api/storyroom/block";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacySettingsDetail({ route }) {
  const { title, subtitle } = route.params;
  const [list, setList] = useState([]);

  const config = useMemo(
    () => ({
      추천: {
        load: loadBlockedPlaces,
        cancel: cancelPlaceBlock,
        render: (item, onCancel) => (
          <PlaceCard
            place={item}
            isHaveScrap={false}
            canGoDetail={false}
            modalOptions={[
              {
                type: "reset",
                text: "다시 추천받기",
                color: theme.main_blue,
                onPress: () => onCancel(item.id),
              },
            ]}
          />
        ),
      },
      차단: {
        load: loadBlockedPosts,
        cancel: cancelPostBlock,
        render: (item, onCancel) => (
          <ItemCard
            item={item}
            from="companion"
            isHaveScrap={false}
            modalOptions={[
              {
                type: "reset",
                text: "차단 해제하기",
                color: theme.main_blue,
                onPress: () => onCancel(item.id),
              },
            ]}
          />
        ),
      },
      신고: {
        load: loadBlockedStoryRooms,
        cancel: cancelStoryPostBlock,
        render: (item, onCancel) => (
          <ItemCard
            item={item}
            from="story"
            isHaveScrap={false}
            canGoDetail={false}
            modalOptions={[
              {
                type: "reset",
                text: "차단 해제하기",
                color: theme.main_blue,
                onPress: () => onCancel(item.id),
              },
            ]}
          />
        ),
      },
    }),
    []
  );

  const current = config[title];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await current.load();
        if (mounted && data) setList(data);
      } catch (e) {
        console.log("load error: ", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [current]);

  const handleCancel = useCallback(
    async (id) => {
      const ok = await current.cancel(id);
      if (ok) setList((prev) => prev.filter((it) => it.id !== id));
    },
    [current]
  );

  const renderItem = useCallback(
    ({ item }) => current.render(item, handleCancel),
    [current, handleCancel]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={subtitle} />
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id != null ? String(item.id) : String(index)
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.text}>목록 없음</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  text: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#919191",
    paddingBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
