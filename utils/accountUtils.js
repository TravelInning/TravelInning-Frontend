import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { showToast } from "../component/Toast";
import { deleteAccount } from "../api/mypage/account";
import { logout } from "../api/login/login";
import { disconnectSocket } from "../socket/chatSocket";
import { login } from "../api/login/login";
import { loadProfile } from "../api/mypage/profile";

export async function handleLogin(id, password, navigation) {
  try {
    const result = await login(id, password);
    if (result) {
      await AsyncStorage.setItem("accessToken", result.jwt);
      await SecureStore.setItemAsync("refreshToken", result.refreshToken);

      try {
        const prof = await loadProfile();
        if (prof?.isSuccess && prof?.result) {
          await AsyncStorage.setItem("userId", String(prof.result.memberId));
          await AsyncStorage.setItem("userName", String(prof.result.nickname));
        } else {
          await AsyncStorage.removeItem("userId");
          await AsyncStorage.removeItem("userName");
        }
      } catch {
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("userName");
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } else {
      showToast("로그인에 실패했습니다.");
    }
  } catch (err) {
    console.log("login error:", err);
    showToast("로그인 중 오류가 발생했습니다.");
  }
}

export async function handleAccountDelete(navigation) {
  try {
    const result = await deleteAccount();
    if (result?.isSuccess) {
      showToast("계정삭제가 완료되었습니다.");
      await clearUserStorage();
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    } else {
      showToast(result?.message);
    }
  } catch (error) {
    console.log("delete account error: ", error);
  }
}

export async function handleLogout(navigation) {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      const isSuccess = await logout(accessToken);
      if (isSuccess) {
        disconnectSocket();
        await clearUserStorage();
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      }
    }
  } catch (error) {
    console.log("logout error: ", error);
  }
}

async function clearUserStorage() {
  await AsyncStorage.multiRemove([
    "accessToken",
    "userId",
    "userName",
    "teamId",
  ]);
  await SecureStore.deleteItemAsync("refreshToken");
}
