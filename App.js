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
import LoginScreen from "./screens/LoginScreen";
import JoinMemberPhoneNumber from "./screens/JoinMember/JoinMemberPhoneNumber";
import JoinMemberEmail from "./screens/JoinMember/JoinMemberEmail";
import ChatScreen from "./screens/Chat/ChatScreen";
import GoWithNav from "./screens/GoWith/GoWithNav";
import ChatListScreen from "./screens/Chat/ChatListScreen";
import ChatListDetailScreen from "./screens/Chat/ChatListDetailScreen";
import GoWithPostDetail from "./screens/GoWith/GoWithPostDetail";
import GoWithForm from "./screens/GoWith/GoWithForm";
import StoryEditScreen from "./screens/Story/StoryEditScreen";
import StoryNav from "./screens/Story/StoryNav";
import StoryScreen from "./screens/Story/StoryScreen";
import MyPageMainScreen from "./screens/MyPage/MyPageMainScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./component/Toast";
import MyTravelinningScreen from "./screens/MyPage/MyTravelinningScreen";
import PrivacySettingsScreen from "./screens/MyPage/PrivacySettingsScreen";
import PrivacySettingsDetail from "./screens/MyPage/PrivacySettingsDetail";
import MyPostScreen from "./screens/MyPage/MyPostScreen";
import MyScrapScreen from "./screens/MyPage/MyScrapScreen";
import TermsInfoScreen from "./screens/MyPage/TermsInfo/TermsInfoScreen";
import TermsInfoDetail from "./screens/MyPage/TermsInfo/TermsInfoDetail";
import SettingScreen from "./screens/MyPage/SettingScreen";
import SplashScreen from "./screens/SplashScreen";

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
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
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
          name="ChatListDetail"
          component={ChatListDetailScreen}
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
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
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoWithNav"
          component={GoWithNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoWithPostDetail"
          component={GoWithPostDetail}
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="GoWithForm"
          component={GoWithForm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StoryNav"
          component={StoryNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StoryEdit"
          component={StoryEditScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Story"
          component={StoryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyPageMain"
          component={MyPageMainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyTravelinning"
          component={MyTravelinningScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacySettings"
          component={PrivacySettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacySettingsDetail"
          component={PrivacySettingsDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyScrap"
          component={MyScrapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyPost"
          component={MyPostScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsInfo"
          component={TermsInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsInfoDetail"
          component={TermsInfoDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
