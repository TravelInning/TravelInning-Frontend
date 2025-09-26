import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestPage from "./screens/TestPage";
import SelectClub from "./screens/SignUp/SelectClub";
import SelectPhoto from "./screens/SignUp/SelectPhoto";
import HomeScreen from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";
import NoticeScreen from "./screens/NoticeScreen";
import SignUpPassword from "./screens/SignUp/SignUpPassword";
import SignUpProfile from "./screens/SignUp/SignUpProfile";
import SignUpTerms from "./screens/SignUp/SignUpTerms";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpPhoneNumber from "./screens/SignUp/SignUpPhoneNumber";
import SignUpEmail from "./screens/SignUp/SignUpEmail";
import ChatCompanionScreen from "./screens/Chat/ChatCompanionScreen";
import CompanionNav from "./screens/Companion/CompanionNav";
import ChatListScreen from "./screens/Chat/ChatListScreen";
import ChatListDetailScreen from "./screens/Chat/ChatListDetailScreen";
import CompanionPostDetail from "./screens/Companion/CompanionPostDetail";
import CompanionForm from "./screens/Companion/CompanionForm";
import StoryEditScreen from "./screens/Story/StoryEditScreen";
import StoryNav from "./screens/Story/StoryNav";
import StoryScreen from "./screens/Story/StoryScreen";
import MyPageMainScreen from "./screens/MyPage/MyPageMainScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./component/Toast";
import MyTravelinningScreen from "./screens/MyPage/MyTravelInning/MyTravelinningScreen";
import PrivacySettingsScreen from "./screens/MyPage/Privacy/PrivacySettingsScreen";
import PrivacySettingsDetail from "./screens/MyPage/Privacy/PrivacySettingsDetail";
import MyPostScreen from "./screens/MyPage/Post/MyPostScreen";
import MyScrapScreen from "./screens/MyPage/Scrap/MyScrapScreen";
import TermsInfoScreen from "./screens/MyPage/TermsInfo/TermsInfoScreen";
import TermsInfoDetail from "./screens/MyPage/TermsInfo/TermsInfoDetail";
import SettingScreen from "./screens/MyPage/SettingScreen";
import SplashScreen from "./screens/SplashScreen";
import FindPasswordScreen from "./screens/Login/FindPasswordScreen";
import FindEmailScreen from "./screens/Login/FindEmailScreen";
import SuccessScreen from "./screens/Login/SuccessScreen";
import EditProfile from "./screens/MyPage/Profile/EditProfile";
import EditDetail from "./screens/MyPage/Profile/EditDetail";
import Onboarding from "./screens/Onboarding/Onboarding";
import EditAccount from "./screens/MyPage/account/EditAccount";
import EditPhone from "./screens/MyPage/account/EditPhone";
import StoryPostDetail from "./screens/Story/StoryPostDetail";
import ChatStoryScreen from "./screens/Chat/ChatStoryScreen";

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
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash" // 초기 화면 설정
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
            component={SelectPhoto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectClub"
            component={SelectClub}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
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
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FindEmail"
            component={FindEmailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FindPassword"
            component={FindPasswordScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{
              headerShown: false,
            }}
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
            name="SignUpPassword"
            component={SignUpPassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpProfile"
            component={SignUpProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpTerms"
            component={SignUpTerms}
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
            name="SignUpPhoneNumber"
            component={SignUpPhoneNumber}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpEmail"
            component={SignUpEmail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatCompanionScreen}
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
            name="CompanionNav"
            component={CompanionNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CompanionPostDetail"
            component={CompanionPostDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CompanionForm"
            component={CompanionForm}
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
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditDetail"
            component={EditDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditAccount"
            component={EditAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditPhone"
            component={EditPhone}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StoryPostDetail"
            component={StoryPostDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatStory"
            component={ChatStoryScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
