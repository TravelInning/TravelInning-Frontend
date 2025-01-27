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
import PlaceCard from "../component/PlaceCard";
import FilterModal from "../component/FilterModal";

// 디바이스에 따라 메인 마진값 조절
const MARGIN = SCREEN_WIDTH / 10;

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current; // 스크롤 위치 추적

  // 이름과 마진 높이와 투명도 조절
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
    outputRange: [MARGIN, 10], // 높이가 줄어드는 범위
    extrapolate: "clamp",
  });

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
              부산 사직구장
            </Text>
          </TouchableOpacity>
          {/* 채팅, 알림 아이콘 */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => console.log("채팅")}>
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
              Hi, Jihye
            </Text>
          </Animated.View>
          <View
            style={{
              ...styles.rowContainer,
              marginTop: 12,
              marginBottom: 6,
            }}
          >
            <Text style={{ ...styles.todayTeamText, marginRight: 7 }}>
              오늘의
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log("구단선택 클릭");
              }}
              style={styles.rowContainer}
            >
              <DropDown width={9} height={5} />
              <Image
                source={require("../assets/images/clubs/hanwha.png")}
                style={styles.clubImageContainer}
              />
            </TouchableOpacity>
            <Text style={styles.todayTeamText}>한화 이글스 경기</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Pretendard-Regular",
                color: "#505050",
              }}
            >
              {"24.10.27.(일) | "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Pretendard-Regular",
                color: "#000",
              }}
            >
              vs KIA 타이거즈
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
              data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <PlaceCard />}
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
  },
  chatImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 17,
  },
});
