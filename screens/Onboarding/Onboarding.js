import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../colors/color";
import BaseballOn from "../../assets/icon/onboarding/baseball_on.svg";
import BaseballOff from "../../assets/icon/onboarding/baseball_off.svg";
import BottomBtn from "../../component/BottomBtn";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const titles = [
  "최애 구단 맞춤 지역 명소 추천",
  "야구 직관과 여행 동행찾기",
  "이야기방에서 수다 떨기",
];

const images = [
  require("../../assets/images/onboarding/onboarding1.png"),
  require("../../assets/images/onboarding/onboarding2.png"),
  require("../../assets/images/onboarding/onboarding3.png"),
];

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % titles.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const onMomentumEnd = (ev) => {
    const index = Math.round(
      ev.nativeEvent.contentOffset.x / ev.nativeEvent.layoutMeasurement.width
    );
    currentIndexRef.current = index;
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.carouselConatiner}>
      <Text style={styles.title}>{titles[index]}</Text>
      <Image source={images[index]} style={styles.image} />
    </View>
  );

  const goLogin = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    navigation.replace("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goLogin}>
          <Text style={styles.jump}>건너뛰기</Text>
        </TouchableOpacity>
        <View style={styles.indicator}>
          {titles.map((_, idx) =>
            idx <= currentIndex ? (
              <BaseballOn key={idx} width={8} height={8} />
            ) : (
              <BaseballOff key={idx} width={8} height={8} />
            )
          )}
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={titles}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        style={{ flexGrow: 0 }}
      />
      <TouchableOpacity onPress={goLogin}>
        <Text style={styles.haveAccountText}>
          이미 계정이 있다면? <Text style={styles.loginText}>로그인</Text>
        </Text>
      </TouchableOpacity>
      <BottomBtn
        text="다음"
        onPress={async () => {
          await AsyncStorage.setItem("hasOnboarded", "true");
          navigation.replace("SignUpPhoneNumber");
        }}
        isDisabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginBottom: 34,
  },
  jump: {
    fontFamily: "Pretendard-Medium",
    fontSize: 15,
    color: theme.main_blue,
  },
  indicator: {
    flexDirection: "row",
    gap: 12,
  },
  carouselConatiner: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginBottom: 45,
  },
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 24,
    color: theme.main_black,
    marginBottom: 30,
  },
  image: {
    height: SCREEN_HEIGHT / 2,
    resizeMode: "contain",
  },
  haveAccountText: {
    alignSelf: "center",
    fontFamily: "Pretendard-Regular",
    fontSize: 15,
    color: "#636363",
  },
  loginText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 15,
    color: theme.main_blue,
  },
});
