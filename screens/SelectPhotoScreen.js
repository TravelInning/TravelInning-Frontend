import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { theme } from "../colors/color";
import Check from "../assets/icon/check.svg";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useState } from "react";
import BottomBtn from "../component/BottomBtn";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_SIZE = SCREEN_WIDTH / 3;

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
      <View style={{ marginTop: 80 }}>
        <Text style={styles.text}>
          <Text>마음에 드는 </Text>
          <Text style={{ color: theme.main_blue }}>관광지 키워드</Text>를
        </Text>
        <Text style={styles.text}>
          <Text style={{ color: theme.main_blue }}>2개</Text> 골라주세요!
        </Text>
        <Text style={{ marginTop: 10, marginBottom: 30 }}>
          해당하는 장소를 우선으로 추천드릴게요
        </Text>
      </View>
      <View style={styles.imageGrid}>
        {keywords.map((keyword, index) => {
          const isSelected = selectedKeyword.includes(keyword);
          return (
            <View
              key={index}
              style={{
                margin: 10,
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  if (selectedKeyword.length == 2 && !isSelected) {
                    console.log("사진이 2개 선택되었습니다.");
                  } else {
                    togglePhoto(keyword);
                  }
                }}
              >
                <ImageBackground
                  source={imageMap[keyword]}
                  resizeMode="cover"
                  imageStyle={{
                    borderRadius: 100,
                  }}
                  style={styles.imageContainter}
                >
                  {isSelected ? (
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor: theme.main_blue,
                        },
                      ]}
                    >
                      <Check width={11} height={11} />
                    </View>
                  ) : (
                    <View style={styles.circle} />
                  )}
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

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
  },
  text: {
    fontSize: 28,
    fontFamily: "Pretendard-ExtraBold",
    color: "#000",
  },
  imageGrid: {
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
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
  },
});
