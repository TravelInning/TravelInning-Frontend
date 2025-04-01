import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import React, { useState } from "react";
import { CompCard } from "../../component/MyPage/PrivacySettingComp";

export default function PrivacySettingsDetail({ navigation, route }) {
  const { title, subtitle } = route.params;
  const [list, setList] = useState([1, 2, 3]);

  // title에 따라 api 호출해서 list 세팅
  useState(() => {}, []);

  const renderItem = ({ item }) => {
    if (title === "추천") {
      return (
        <CompCard
          title="용호만 유람선 터미널"
          content="광안대교나 오륙도를 구경하는 코스로 요트를 타볼 수ㅜ 있느느느느느느느느느ㅡㄴㄴ"
          distance="13"
          photo={require("../../assets/images/selectphoto/photo1.png")}
          from="place"
          isVisibleModal={true}
        />
      );
    } else if (title === "삭제") {
      return (
        <CompCard
          title="게시글 제목 예를 들면 ㅇㅇㅇㅇ"
          content="삼성vskia 경기 보러갈건데요.
같은 ㄴ성별만 원하는데요. ㅇㅇㅇㅇㅇ"
          date="11.01"
          nickname="최강삼성"
          photo={require("../../assets/images/gowith/logo.png")}
          from="gowith"
        />
      );
    } else if (title === "차단") {
      return (
        <CompCard
          title="게시글 제목 예를 들면 ㅇㅇㅇㅇ"
          content="삼성vskia 경기 보러갈건데요.
같은 ㄴ성별만 원하는데요. ㅇㅇㅇㅇㅇ"
          date="11.01"
          nickname="최강삼성"
          photo={require("../../assets/images/gowith/logo.png")}
          from="gowith"
          isVisibleModal={true}
        />
      );
    } else {
      return (
        <CompCard
          category="야구"
          content="한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니니닌까ㅏ깎 "
          date="25.02.28"
          photo={require("../../assets/images/gowith/logo.png")}
          from="story"
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
