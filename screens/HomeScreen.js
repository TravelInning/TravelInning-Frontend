import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import Location from "../assets/icon/location.svg";
import Notice from "../assets/icon/notification.svg";
import DropDown from "../assets/icon/dropdown.svg";
import Filter from "../assets/icon/filter.svg";
import { theme } from "../colors/color";
import { Shadow } from "react-native-shadow-2";
import PlaceCard from "../component/PlaceCard";
import FilterModal from "../component/FilterModal";

// 디바이스에 따라 메인 마진값 조절
const SCREEN_WIDTH = Dimensions.get("window").width;
const MARGIN = SCREEN_WIDTH / 10;

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState([]);

  // 애니메이션 적용하려했는데
  // 스크롤 안하고 꾹누르고 있으면 깜빡거리는 문제가 있어서 일단 보류
  //   const scrollY = useRef(new Animated.Value(0)).current;

  //   const headerHeight = scrollY.interpolate({
  //     inputRange: [0, 150], // 스크롤 위치에 따라 조정
  //     outputRange: [MARGIN * 4, 0], // 상단 영역 높이 축소
  //     extrapolate: "clamp",
  //   });

  //   const headerOpacity = scrollY.interpolate({
  //     inputRange: [0, 80],
  //     outputRange: [1, 0],
  //     extrapolate: "clamp",
  //   });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/home/home_background.png")}
        resizeMode="stretch"
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 62,
        }}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={{ width: 12 }} />
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
          <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
            <Notice width={12} height={14} />
          </TouchableOpacity>
          {/* 새 알림 있을때만 보일거 */}
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
          />
        </View>
        {/* 이름, 오늘의 경기 */}
        {/* <Animated.View
          style={{
            width: "100%",
            height: headerHeight,
            opacity: headerOpacity,
          }}
        > */}
        <View
          style={{
            width: "100%",
            marginTop: MARGIN,
            marginBottom: MARGIN,
            paddingHorizontal: 30,
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
        </View>
        {/* </Animated.View> */}
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
            {/* <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
            > */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
            </ScrollView>
            {/* </Animated.ScrollView> */}
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
  container: { flex: 1, backgroundColor: "#fff" },
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
});
