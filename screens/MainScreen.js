// MainScreen.jsx
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, DeviceEventEmitter } from "react-native"; // ✅ DeviceEventEmitter import
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../colors/color";
import Home from "../assets/icon/tabBarIcon/home.svg";
import Companion from "../assets/icon/tabBarIcon/go_with.svg";
import GameInfo from "../assets/icon/tabBarIcon/game_info.svg";
import Story from "../assets/icon/tabBarIcon/story.svg";
import My from "../assets/icon/tabBarIcon/my.svg";
import HomeGray from "../assets/icon/tabBarIcon/home_gray.svg";
import CompanionGray from "../assets/icon/tabBarIcon/go_with_gray.svg";
import GameInfoGray from "../assets/icon/tabBarIcon/game_info_gray.svg";
import StoryGray from "../assets/icon/tabBarIcon/story_gray.svg";
import HomeScreen from "./HomeScreen";
import TestPage from "./TestPage";
import CompanionNav from "./Companion/CompanionNav";
import StoryNav from "./Story/StoryNav";
import MyPageMainScreen from "./MyPage/MyPageMainScreen";
import { loadProfile } from "../api/mypage/profile";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await loadProfile();
      setProfileImage(data?.result?.profileImgUrl ?? null);
    })();

    const sub = DeviceEventEmitter.addListener("PROFILE_UPDATED", (url) => {
      setProfileImage(url ?? null);
    });
    return () => sub.remove();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 22,
          paddingTop: 4,
          paddingHorizontal: 10,
        },
        tabBarActiveTintColor: theme.main_black,
        tabBarInactiveTintColor: theme.gray,
        tabBarLabelStyle: styles.tabBarText,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Home width={18} height={18} />
            ) : (
              <HomeGray width={18} height={18} />
            ),
        }}
      />
      <Tab.Screen
        name="Companion"
        component={CompanionNav}
        options={{
          title: "동행찾기",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Companion width={21} height={18} />
            ) : (
              <CompanionGray width={21} height={18} />
            ),
        }}
      />
      {/* <Tab.Screen
        name="GameInfo"
        component={TestPage}
        options={{
          title: "테스트",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <GameInfo width={18} height={18} />
            ) : (
              <GameInfoGray width={18} height={18} />
            ),
        }}
      /> */}
      <Tab.Screen
        name="Story"
        component={StoryNav}
        options={{
          title: "이야기방",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Story width={22} height={20} />
            ) : (
              <StoryGray width={22} height={20} />
            ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageMainScreen}
        options={{
          title: "내 정보",
          tabBarIcon: () =>
            profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.img} />
            ) : (
              <My width={19} height={19} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarText: { fontSize: 9, fontFamily: "Pretendard-Regular" },
  img: { width: 19, height: 19, resizeMode: "cover", borderRadius: 30 },
});
