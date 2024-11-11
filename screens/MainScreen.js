import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../colors/color";
import Home from "../assets/icon/tabBarIcon/home.svg";
import GoWith from "../assets/icon/tabBarIcon/go_with.svg";
import GameInfo from "../assets/icon/tabBarIcon/game_info.svg";
import OnlineTour from "../assets/icon/tabBarIcon/online_tour.svg";
import My from "../assets/icon/tabBarIcon/my.svg";
import HomeGray from "../assets/icon/tabBarIcon/home_gray.svg";
import GoWithGray from "../assets/icon/tabBarIcon/go_with_gray.svg";
import GameInfoGray from "../assets/icon/tabBarIcon/game_info_gray.svg";
import OnlineTourGray from "../assets/icon/tabBarIcon/online_tour_gray.svg";
import HomeScreen from "./HomeScreen";
import TestPage from "./TestPage";

const Tab = createBottomTabNavigator();

const SvgIcon = ({ asset }) => (
  <WithLocalSvg width="25" height="25" asset={asset} />
);

export default function MainScreen({ route }) {
  // const { user_code, ipnumber } = route.params;
  // console.log(user_code, ipnumber);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 67,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 19,
          paddingTop: 12,
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
          tabBarIcon: ({ color }) =>
            color === theme.main_black ? (
              <Home width={18} height={18} />
            ) : (
              <HomeGray width={18} height={18} />
            ),
        }}
        initialParams={
          {
            //   ipnumber: ipnumber,
            //   user_code: user_code,
          }
        }
      />
      <Tab.Screen
        name="GoWith"
        component={HomeScreen}
        options={{
          title: "동행찾기",
          tabBarIcon: ({ color }) =>
            color === theme.main_black ? (
              <GoWith width={21} height={18} />
            ) : (
              <GoWithGray width={21} height={18} />
            ),
        }}
      />
      <Tab.Screen
        name="GameInfo"
        component={TestPage}
        options={{
          title: "경기정보",
          tabBarIcon: ({ color }) =>
            color == theme.main_black ? (
              <GameInfo width={18} height={18} />
            ) : (
              <GameInfoGray width={18} height={18} />
            ),
        }}
      />
      <Tab.Screen
        name="OnlineTour"
        component={HomeScreen}
        options={{
          title: "랜선투어",
          tabBarIcon: ({ color }) =>
            color == theme.main_black ? (
              <OnlineTour width={26} height={18} />
            ) : (
              <OnlineTourGray width={26} height={18} />
            ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={HomeScreen}
        options={{
          title: "내 정보",
          tabBarIcon: () => <My width={18} height={18} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    justifyContent: "space-between",
  },
  tabBarText: {
    fontSize: 9,
    fontFamily: "Pretendard-Regular",
    marginTop: 4,
  },
});
