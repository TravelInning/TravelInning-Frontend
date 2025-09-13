import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
} from "react-native";
import Location from "../assets/icon/location.svg";
import Notice from "../assets/icon/notification.svg";
import NewNotice from "../assets/icon/notification_new.svg";
import DropDown from "../assets/icon/dropdown.svg";
import Filter from "../assets/icon/filter.svg";
import { theme, SCREEN_WIDTH } from "../colors/color";
import PlaceCard from "../component/Home/PlaceCard";
import FilterModal from "../component/Home/FilterModal";
import { useDoubleBackExit } from "../hooks/useDoubleBackExit";
import { loadHeader, loadplace } from "../api/home/home";
import { homeClubMapping } from "../constants/mapping";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addPlaceBlock } from "../api/block/place";

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [teamId, setTeamId] = useState(10);
  const [headerData, setHeaderData] = useState({
    baseTeamName: "",
    gameDate: "",
    nickname: "",
    opponentTeamName: "",
    stadiumName: "",
  });
  const [filter, setFilter] = useState({
    teamId: 1,
    categoryCodes: "",
    useDefaultCategory: false,
    myScrapOnly: false,
    sort: "popularity",
  });
  const [places, setPlaces] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useDoubleBackExit();

  // animation
  const nameHeight = scrollY.interpolate({
    inputRange: [0, 100], // 스크롤 범위
    outputRange: [40, 0], // 높이가 줄어드는 범위
    extrapolate: "clamp",
  });
  const nameOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0], // 투명도 변화
    extrapolate: "clamp",
  });
  const marginHeight = scrollY.interpolate({
    inputRange: [0, 100], // 스크롤 범위
    outputRange: [SCREEN_WIDTH / 10, 10], // 높이가 줄어드는 범위
    extrapolate: "clamp",
  });

  useEffect(() => {
    const handleHeader = async () => {
      const data = await loadHeader(teamId);
      setHeaderData(data);
    };

    const loadTeamId = async () => {
      const data = await AsyncStorage.getItem("teamId");
      const parsedData = data ? parseInt(data, 10) : 1;
      setTeamId(parseInt(parsedData, 10));
    };

    // handleHeader();
    // loadTeamId();
  }, []);

  useEffect(() => {
    const loadplaces = async () => {
      const data = await loadplace(filter);
      setPlaces(data.result);
    };
    loadplaces();
  }, [filter]);

  const formattedDate = (date) => {
    const weekMap = ["일", "월", "화", "수", "목", "금", "토"];
    const newDate = new Date(date);
    const year = String(newDate.getFullYear()).slice(2);
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const week = weekMap[newDate.getDay()];

    return `${year}.${month}.${day}(${week})`;
  };

  const handlePlaceBlock = async () => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));

    try {
      await addPlaceBlock(id);
    } catch (error) {
      showToast("차단 실패! 다시 시도해주세요.");
      setPlaces((prev) => [...prev, place]);
    }
  };

  return (
    <SafeAreaView style={theme.container}>
      <ImageBackground
        source={require("../assets/images/home/home_background.png")}
        resizeMode="stretch"
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={{ width: 46 }} />
          <TouchableOpacity
            onPress={() => console.log("위치 클릭")}
            style={styles.rowContainer}
          >
            <View
              style={{
                width: 13,
                height: 13,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <Location resizeMode="contain" />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Pretendard-Medium",
                color: theme.main_black,
              }}
            >
              {headerData.stadiumName}
            </Text>
          </TouchableOpacity>
          {/* 채팅, 알림 아이콘 */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.jumpTo("GoWith", { screen: "채팅내역" })
              }
            >
              <Image
                source={require("../assets/icon/chat.png")}
                style={styles.chatImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
              <Notice width={15} height={17} />
            </TouchableOpacity>
            {/* 안읽은게 있을때 */}
            {/* <TouchableOpacity onPress={() => console.log("채팅")}>
              <Image
                source={require("../assets/icon/chat_new.png")}
                style={styles.chatImage}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
              <NewNotice width={15} height={17} />
            </TouchableOpacity> */}
          </View>
          {/* 새 알림 있을때만 보일거
          <View
            style={{
              position: "absolute",
              right: 20,
              top: 0,
              width: 4,
              height: 4,
              backgroundColor: theme.main_blue,
              borderRadius: 30,
            }}
          /> */}
        </View>
        {/* 이름, 오늘의 경기 */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <Animated.View
            style={{
              width: "100%",
              height: nameHeight,
              opacity: nameOpacity,
              marginTop: marginHeight,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Pretendard-ExtraBold",
                color: "#000",
              }}
            >
              Hi, {headerData.nickname}
            </Text>
          </Animated.View>
          <View
            style={{
              ...styles.rowContainer,
              marginTop: 12,
              marginBottom: 6,
            }}
          >
            <Text style={{ ...styles.todayTeamText }}>오늘의</Text>
            <Image
              source={homeClubMapping[teamId - 1].imgSrc}
              style={styles.clubImageContainer}
            />
            <Text style={styles.todayTeamText}>
              {headerData.baseTeamName} 경기
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Pretendard-Regular",
                color: "#505050",
              }}
            >
              {`${formattedDate(headerData.gameDate)} | `}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Pretendard-Regular",
                color: "#000",
              }}
            >
              vs {headerData.opponentTeamName}
            </Text>
          </View>
          <Animated.View style={{ height: marginHeight }} />
        </View>

        {/* 추천 플레이스 */}
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <ImageBackground
            source={require("../assets/images/home/blur_background.png")}
            style={{
              flex: 1,
              paddingTop: 30,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                ...styles.rowContainer,
                justifyContent: "space-between",
                marginHorizontal: 30,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: "Pretendard-ExtraBold",
                  color: theme.main_black,
                }}
              >
                추천 플레이스
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.rowContainer}
              >
                <Filter width={8} height={6} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Pretendard-Medium",
                    color: theme.main_black,
                    marginLeft: 4,
                  }}
                >
                  필터
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={places}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PlaceCard
                  place={item}
                  modalOptions={[
                    { type: "share", text: "공유하기", onPress: () => {} },
                    {
                      type: "reject",
                      text: "더 이상 추천받지 않음",
                      color: "#f00",
                      onPress: handlePlaceBlock,
                    },
                  ]}
                />
              )}
              contentContainerStyle={styles.scroll}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            />
          </ImageBackground>
        </View>
      </ImageBackground>
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        filter={filter}
        setFilter={setFilter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  todayTeamText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: "#000",
  },
  clubImageContainer: {
    width: 24,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    marginHorizontal: 3,
  },
  scroll: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  chatImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 17,
  },
});
