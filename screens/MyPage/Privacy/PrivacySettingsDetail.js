import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../colors/color";
import { Header } from "../../../component/Header/Header";
import React, { useState } from "react";
import ItemCard from "../../../component/MyPage/ItemCard";
import PlaceCard from "../../../component/Home/PlaceCard";
import { cancelPlaceBlock, loadBlockedPlaces } from "../../../api/place/block";
import {
  addPostBlock,
  cancelPostBlock,
  loadBlockedPosts,
} from "../../../api/companion/block";

export default function PrivacySettingsDetail({ route }) {
  const { title, subtitle } = route.params;
  const [list, setList] = useState([]);

  useState(() => {
    if (title === "추천") {
      loadPlaces();
    } else if (title === "차단") {
      loadPosts();
    } else {
    }
  }, []);

  async function loadPlaces() {
    const data = await loadBlockedPlaces();
    if (data) {
      setList(data);
    }
  }

  async function loadPosts() {
    const data = await loadBlockedPosts();
    if (data) {
      setList(data);
      console.log("data: ", data);
    }
  }

  const handleCancelPlaceBlock = async (id) => {
    const success = await cancelPlaceBlock(id);
    if (success) {
      setList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCancelPostBlock = async (id) => {
    const success = await cancelPostBlock(id);
    if (success) {
      setList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const renderItem = ({ item }) => {
    if (title === "추천") {
      return (
        <PlaceCard
          place={item}
          isHaveScrap={false}
          modalOptions={[
            {
              type: "reset",
              text: "다시 추천받기",
              color: theme.main_blue,
              onPress: () => handleCancelPlaceBlock(item.id),
            },
          ]}
        />
      );
    } else if (title === "차단") {
      return (
        <ItemCard
          item={item}
          from="companion"
          isHaveScrap={false}
          canGoDetail={false}
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
          canGoDetail={false}
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
    <SafeAreaView style={theme.container}>
      <Header title={subtitle} />
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
