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
import { WithLocalSvg } from "react-native-svg/css";
import Check from "../assets/icon/check.svg";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useState } from "react";
import BottomBtn from "../component/BottomBtn";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_RATIO = SCREEN_WIDTH / 390;
const IMAGE_SIZE = 160 * SCREEN_RATIO;

export default function SelectPhotoScreen({ navigation }) {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [scoreKeyword, setScoreKeyword] = useState([0, 0, 0, 0]); // 사진 키워드
  const photos = [
    "photo1_1.png",
    "photo2_4.png",
    "photo4_1.png",
    "photo3_3.png",
    "photo1_4.png",
    "photo2_1.png",
    "photo2_2.png",
    "photo4_3.png",
    "photo1_2.png",
    "photo2_3.png",
    "photo3_1.png",
    "photo1_3.png",
    "photo3_4.png",
    "photo4_2.png",
    "photo4_4.png",
    "photo3_2.png",
  ];
  const imageMap = {
    "photo1_1.png": require("../assets/images/selectphoto/photo1_1.png"),
    "photo1_2.png": require("../assets/images/selectphoto/photo1_2.png"),
    "photo1_3.png": require("../assets/images/selectphoto/photo1_3.png"),
    "photo1_4.png": require("../assets/images/selectphoto/photo1_4.png"),
    "photo2_1.png": require("../assets/images/selectphoto/photo2_1.png"),
    "photo2_2.png": require("../assets/images/selectphoto/photo2_2.png"),
    "photo2_3.png": require("../assets/images/selectphoto/photo2_3.png"),
    "photo2_4.png": require("../assets/images/selectphoto/photo2_4.png"),
    "photo3_1.png": require("../assets/images/selectphoto/photo3_1.png"),
    "photo3_2.png": require("../assets/images/selectphoto/photo3_2.png"),
    "photo3_3.png": require("../assets/images/selectphoto/photo3_3.png"),
    "photo3_4.png": require("../assets/images/selectphoto/photo3_4.png"),
    "photo4_1.png": require("../assets/images/selectphoto/photo4_1.png"),
    "photo4_2.png": require("../assets/images/selectphoto/photo4_2.png"),
    "photo4_3.png": require("../assets/images/selectphoto/photo4_3.png"),
    "photo4_4.png": require("../assets/images/selectphoto/photo4_4.png"),
  };

  useEffect(() => {
    console.log(selectedPhotos);
    console.log(scoreKeyword);
  }, [selectedPhotos, scoreKeyword]);

  // 사진 선택 토글
  const togglePhoto = (photo) => {
    setSelectedPhotos((prevSelected) => {
      const match = photo.match(/photo(\d)/);
      const isSelected = prevSelected.includes(photo);

      if (match) {
        const index = parseInt(match[1]) - 1;
        setScoreKeyword((prevScoreKeyword) => {
          const newScoreKeyword = [...prevScoreKeyword];
          newScoreKeyword[index] += isSelected ? -1 : 1;

          return newScoreKeyword;
        });
      }

      return isSelected
        ? prevSelected.filter((s) => s !== photo)
        : [...prevSelected, photo];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 120,
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.text}>
          <Text style={{ color: theme.main_blue }}>마음에 드는</Text>
          <Text> 사진 </Text>
          <Text style={{ color: theme.main_blue }}>5장을</Text>
        </Text>
        <Text style={styles.text}>골라주세요!</Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {[0, 1].map((row) => (
            <View style={{ marginTop: row === 0 ? 50 : 70 }} key={row}>
              {photos.slice(row * 8, (row + 1) * 8).map((photo, index) => {
                const isSelected = selectedPhotos.includes(photo);
                return (
                  index < 8 && (
                    <Shadow
                      key={index}
                      distance={2}
                      startColor="#00000030"
                      endColor="#00000000"
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          if (selectedPhotos.length == 5 && !isSelected) {
                            console.log("5개를 선택하였습니다.");
                          } else {
                            togglePhoto(photo);
                          }
                        }}
                        style={styles.imageContainter}
                      >
                        <ImageBackground
                          source={imageMap[photo]}
                          resizeMode="cover"
                          imageStyle={{
                            borderRadius: 16,
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 16,
                            overflow: "hidden",
                          }}
                        >
                          {isSelected ? (
                            <View style={styles.selectedContainer}>
                              <View
                                style={[
                                  styles.circle,
                                  {
                                    backgroundColor: theme.main_blue,
                                    margin: 10,
                                  },
                                ]}
                              >
                                <WithLocalSvg asset={Check} />
                              </View>
                            </View>
                          ) : (
                            <View style={styles.circle} />
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                    </Shadow>
                  )
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 버튼 */}
      <BottomBtn
        text="완료"
        onPress={() => console.log("완료")}
        isDisabled={selectedPhotos.length < 5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    color: "#000",
  },
  circle: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    margin: 12,
    backgroundColor: "#F3F3F3",
  },
  imageContainter: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
  },
  selectedContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.main_blue,
    backgroundColor: "#00000000",
  },
});
