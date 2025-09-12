import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { showToast } from "../component/Toast";

/**
 * 안드로이드에서 뒤로가기 버튼을 두 번 눌러야 앱을 종료하는 훅
 */
export const useDoubleBackExit = (message = "한 번 더 누르면 종료됩니다") => {
  const backPressCount = useRef(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current === 0) {
        backPressCount.current += 1;
        showToast(message);

        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000); // 2초 내에 다시 누르지 않으면 초기화

        return true; // 기본 뒤로가기 막기
      } else {
        BackHandler.exitApp(); // 앱 종료
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [message]);
};
