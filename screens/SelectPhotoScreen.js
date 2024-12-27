import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { theme, SCREEN_HEIGHT } from "../colors/color";
import Check from "../assets/icon/check.svg";
import { useEffect, useState } from "react";
import BottomBtn from "../component/BottomBtn";

// 디바이스에 따라 메인 마진값 조절
const MARGIN = SCREEN_HEIGHT / 40;

export default function SelectPhotoScreen({ navigation }) {
  const [selectedKeyword, setSelectedKeyword] = useState([]); // 선택 키워드
  const keywords = ["자연", "인문", "레포츠", "쇼핑", "음식", "기타"];
  const imageMap = {
    자연: require("../assets/images/selectphoto/photo1.png"),
    인문: require("../assets/images/selectphoto/photo2.png"),
    레포츠: require("../assets/images/selectphoto/photo3.png"),
    쇼핑: require("../assets/images/selectphoto/photo4.png"),
    음식: require("../assets/images/selectphoto/photo5.png"),
    기타: require("../assets/images/selectphoto/photo6.png"),
  };

  useEffect(() => {
    console.log(selectedKeyword);
  }, [selectedKeyword]);

  // 사진 선택 토글
  const togglePhoto = (keyword) => {
    setSelectedKeyword((preSeleted) => {
      return preSeleted.includes(keyword)
        ? preSeleted.filter((s) => s !== keyword)
        : [...preSeleted, keyword];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", marginTop: 18 + MARGIN }}>
        <Text style={styles.text}>
          <Text>마음에 드는 </Text>
          <Text style={{ color: theme.main_blue }}>관광지 키워드</Text>를
        </Text>
        <Text style={styles.text}>
          <Text style={{ color: theme.main_blue }}>2개</Text> 골라주세요!
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Pretendard-Medium",
            color: "#545454",
            marginTop: MARGIN - 12,
            marginBottom: MARGIN + 10,
          }}
        >
          해당하는 장소를 우선으로 추천드릴게요
        </Text>
      </View>
      <FlatList
        data={keywords}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // 열 수를 2로 설정
        columnWrapperStyle={{
          justifyContent: "space-between", // 각 열의 요소 간격 설정
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 100,
        }}
        renderItem={({ item, index }) => {
          const isSelected = selectedKeyword.includes(item);
          return (
            <View
              style={{
                width: "42%",
                aspectRatio: 1,
                marginBottom: MARGIN,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={selectedKeyword.length == 2 && !isSelected}
                onPress={() => {
                  if (selectedKeyword.length == 2 && !isSelected) {
                    console.log("사진이 2개 선택되었습니다.");
                  } else {
                    togglePhoto(item);
                  }
                }}
                style={{ flex: 1 }}
              >
                <ImageBackground
                  source={imageMap[item]}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 100 }}
                  style={styles.imageContainter}
                >
                  <View
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#00000030",
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        fontFamily: "Pretendard-Bold",
                        color: "#fff",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                  {isSelected ? (
                    <View
                      style={[
                        styles.circle,
                        {
                          borderColor: theme.main_blue,
                          backgroundColor: theme.main_blue,
                        },
                      ]}
                    >
                      <Check width={13} height={13} />
                    </View>
                  ) : (
                    <View style={styles.circle} />
                  )}
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* 버튼 */}
      <BottomBtn
        text="완료"
        onPress={() => console.log("완료")}
        isDisabled={selectedKeyword.length < 2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 28,
    fontFamily: "Pretendard-ExtraBold",
    color: "#000",
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  circle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "#fff",
    borderColor: "#F4F4F4",
    borderWidth: 1,
  },
  imageContainter: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
