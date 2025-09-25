import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
import { useDoubleBackExit } from "../hooks/useDoubleBackExit";
import { loadHeader, loadPlace } from "../api/home/home";
import { homeClubMapping } from "../constants/mapping";
import { addPlaceBlock } from "../api/place/block";
import { useIsFocused } from "@react-navigation/native";
import OptionModal from "../component/common/OptionModal";
import { ymdw } from "../utils/time";
import { loadClub } from "../api/club/club";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [headerData, setHeaderData] = useState({
    baseTeamName: "",
    gameDate: "",
    nickname: "",
    opponentTeamName: "",
    stadiumName: "",
  });
  const [filter, setFilter] = useState({
    teamId: null,
    styleIds: "",
    useDefaultCategory: false,
    myScrapOnly: false,
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
    if (isFocused) {
      const handleHeader = async () => {
        const { result } = await loadClub();
        if (!result.teamId) {
          navigation.replace("SelectClub");
          return;
        }
        const teamId = result.teamId;
        setFilter((prev) => ({ ...prev, teamId: teamId }));
        const data = await loadHeader(teamId);
        setHeaderData(data);
      };

      handleHeader();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && filter.teamId) {
      const loadplaces = async () => {
        const data = await loadPlace(filter);
        setPlaces(data.result);
      };
      loadplaces();
    }
  }, [filter, isFocused]);

  const handlePlaceBlock = async (targetId) => {
    try {
      await addPlaceBlock(targetId);
      setPlaces((prev) => prev.filter((p) => p.id !== targetId));
    } catch (error) {
      showToast("차단 실패! 다시 시도해주세요.");
    }
  };

  const modalOptions = useMemo(
    () => [
      {
        type: "reject",
        text: "더 이상 추천받지 않음",
        color: "#f00",
        onPress: (id) => handlePlaceBlock(id),
      },
    ],
    []
  );

  const renderPlaceCard = useCallback(
    ({ item }) => <PlaceCard place={item} modalOptions={modalOptions} />,
    [modalOptions]
  );

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
          <View style={styles.rowContainer}>
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
          </View>
          {/* 채팅, 알림 아이콘 */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.jumpTo("Companion", { screen: "채팅내역" })
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
            {filter.teamId && (
              <Image
                source={homeClubMapping[filter.teamId - 1].imgSrc}
                style={styles.clubImageContainer}
              />
            )}
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
              {`${ymdw(headerData.gameDate)} | `}
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
              keyExtractor={(item) => String(item.id)}
              renderItem={renderPlaceCard}
              contentContainerStyle={styles.scroll}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews
            />
          </ImageBackground>
        </View>
      </ImageBackground>
      <OptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[
          {
            label: "내가 선택한 관광지 키워드만 보기",
            onPress: () => {
              if (!filter.useDefaultCategory) {
                setFilter((f) => ({ ...f, styleIds: "" }));
              }
              setFilter((f) => ({
                ...f,
                useDefaultCategory: !f.useDefaultCategory,
              }));
            },
            selected: filter.useDefaultCategory,
          },
          {
            label: "그 외 관광지 키워드 선택하기",
            hasNext: true,
          },
          {
            label: "스크랩한 장소만 보기",
            onPress: () =>
              setFilter((f) => ({ ...f, myScrapOnly: !f.myScrapOnly })),
            selected: filter.myScrapOnly,
          },
        ]}
        subOptions={["음식", "인문", "쇼핑", "기타"]}
        selectedSub={filter.styleIds}
        onSelectSub={(value) => {
          setFilter((f) => ({
            ...f,
            styleIds: value,
            useDefaultCategory: false,
          }));
        }}
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
    paddingVertical: 20,
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
