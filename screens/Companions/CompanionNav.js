import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Notice from "../../assets/icon/notification.svg";
import NewNotice from "../../assets/icon/notification_new.svg";
import { theme } from "../../colors/color";
import ChatListScreen from "../Chat/ChatListScreen";
import CompanionScreen from "./CompanionScreen";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function CompanionNav({ navigation }) {
  const route = useRoute();
  const defaultTab = route.params?.screen || "직관동행";

  return (
    <SafeAreaView style={theme.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={theme.rowContainer}>
          <Image
            source={require("../../assets/images/login/test.png")}
            style={{ width: 25, height: 25, marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Pretendard-Bold",
              color: theme.main_black,
            }}
          >
            동행찾기
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
              source={require("../../assets/icon/chat.png")}
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
      <View
        style={{
          marginTop: 15,
          flex: 1,
        }}
      >
        <Tab.Navigator
          initialRouteName={defaultTab}
          screenOptions={{
            tabBarActiveTintColor: theme.main_blue,
            tabBarInactiveTintColor: "#C2C2C2",
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: "Pretendard-Medium",
            },
            tabBarStyle: {
              width: "70%",
              height: 48,
              paddingLeft: 6,
              shadowOpacity: 0,
              elevation: 0,
              backgroundColor: "transparent",
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.main_blue,
              width: 60,
              height: 3,
              marginLeft: 18,
            },
            swipeEnabled: false,
          }}
        >
          <Tab.Screen
            name="직관동행"
            component={CompanionScreen}
            options={{ tabBarLabel: "직관동행" }}
          />
          <Tab.Screen
            name="여행동행"
            component={CompanionScreen}
            options={{ tabBarLabel: "여행동행" }}
          />
          <Tab.Screen
            name="채팅내역"
            component={ChatListScreen}
            options={{ tabBarLabel: "채팅내역" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 13,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  chatImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 17,
  },
});
