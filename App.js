import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestPage from "./screens/TestPage";
import SelectPhotoScreen from "./screens/SelectPhotoScreen";
import SelectClub from "./screens/SelectClub";
import HomeScreen from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";
import NoticeScreen from "./screens/NoticeScreen";
import JoinMemberPassword from "./screens/JoinMember/JoinMemberPassword";
import JoinMemberProfile from "./screens/JoinMember/JoinMemberProfile";
import JoinMemberTerms from "./screens/JoinMember/JoinMemberTerms";
import PostChatScreen from "./screens/Chat/PostChatScreen";
import LoginScreen from "./screens/LoginScreen";
import JoinMemberPhoneNumber from "./screens/JoinMember/JoinMemberPhoneNumber";
import JoinMemberEmail from "./screens/JoinMember/JoinMemberEmail";
import ChatScreen from "./screens/Chat/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // font - expo
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main" // 초기 화면 설정
        screenOptions={{
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Test"
          component={TestPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectPhoto"
          component={SelectPhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectClub"
          component={SelectClub}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notice"
          component={NoticeScreen}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="JoinMemberPassword"
          component={JoinMemberPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JoinMemberProfile"
          component={JoinMemberProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JoinMemberTerms"
          component={JoinMemberTerms}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostChat"
          component={PostChatScreen}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JoinMemberPhoneNumber"
          component={JoinMemberPhoneNumber}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JoinMemberEmail"
          component={JoinMemberEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat" // ChatScreen 추가
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
