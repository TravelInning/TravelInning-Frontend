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
import StoryScreen from "./StoryScreen";

const Tab = createMaterialTopTabNavigator();

export default function StoryNav({ navigation }) {
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
            이야기방
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
          initialRouteName={"모든 이야기"}
          screenOptions={{
            tabBarActiveTintColor: theme.main_blue,
            tabBarInactiveTintColor: "#C2C2C2",
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: "Pretendard-Medium",
            },
            tabBarStyle: {
              height: 48,
              shadowOpacity: 0,
              elevation: 0,
              backgroundColor: "transparent",
              marginHorizontal: 20,
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.main_blue,
              width: 76,
              height: 3,
              marginLeft: "13%",
            },
            swipeEnabled: false,
          }}
        >
          <Tab.Screen
            name="모든 이야기"
            component={StoryScreen}
            options={{ tabBarLabel: "모든 이야기" }}
          />
          <Tab.Screen
            name="이야기해요"
            component={EmptyScreen}
            options={{ tabBarLabel: "이야기해요" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const EmptyScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>공사중</Text>
    </View>
  );
};

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
