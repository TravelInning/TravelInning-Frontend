import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestPage from "./screens/TestPage";
import SelectPhotoScreen from "./screens/SelectPhotoScreen";
import SelectClub from "./screens/SelectClub"; // Import the new screen
import HomeScreen from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";
import NoticeScreen from "./screens/NoticeScreen";
import JoinMemberPassword from "./screens/JoinMember/JoinMemberPassword";
import JoinMemberProfile from "./screens/JoinMember/JoinMemberProfile";
import JoinMemberTerms from "./screens/JoinMember/JoinMemberTerms";
import PostChatScreen from "./screens/Chat/PostChatScreen";

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
        initialRouteName="Main"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
