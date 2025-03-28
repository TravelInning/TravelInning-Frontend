import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../colors/color";
import { LinearGradient } from "expo-linear-gradient";
import SeeMore from "../../assets/icon/mypage/seemore.svg";
import { Shadow } from "react-native-shadow-2";
import Pen from "../../assets/icon/gowith/pen.svg";
import Bookmark from "../../assets/icon/mypage/bookmark_true.svg";
import Plus from "../../assets/icon/mypage/plus.svg";
import Arrow from "../../assets/icon/mypage/right_arrow.svg";
import { API_URL } from "@env";

export default function MyPageMainScreen({ navigation }) {
  const activitys = [
    {
      image: require("../../assets/icon/mypage/chat.png"),
      text: "나의 대화 신청 내역",
    },
    {
      image: require("../../assets/icon/mypage/prohibit.png"),
      text: "내가 차단한 글 및 계정",
    },
  ];

  return (
    <SafeAreaView style={theme.container}>
      <LinearGradient
        colors={["#0084FF18", "transparent"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/icon/mypage/setting.png")}
            style={styles.setting}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SeeMore width={3} height={15} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <ImageBackground
          source={require("../../assets/images/chat/chat_background.png")}
          resizeMode="cover"
          style={styles.background}
        >
          {/* profile */}
          <Image
            source={require("../../assets/images/gowith/logo.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>Jihye</Text>
          {/* my club & bookmark & post */}
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}
          >
            <Shadow
              distance={2}
              startColor="rgba(0, 0, 0, 0.1)"
              finalColor="rgba(0, 0, 0, 0)"
              style={{ width: "100%" }}
            >
              <View style={styles.translucentContainer}>
                {/* club */}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignItems: "center" }}
                >
                  <Image
                    source={require("../../assets/images/clubs/ssg.png")}
                    style={{
                      maxWidth: 48,
                      maxHeight: 32,
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={styles.buttonText}>나의 구단</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                {/* bookmark(clip) */}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignItems: "center" }}
                >
                  <Shadow
                    distance={2}
                    startColor="rgba(0, 0, 0, 0.1)"
                    finalColor="rgba(0, 0, 0, 0)"
                  >
                    <View style={styles.circle}>
                      <Bookmark width={12} height={20} />
                    </View>
                  </Shadow>
                  <Text style={styles.buttonText}>내 스크랩</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                {/* post */}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignItems: "center" }}
                >
                  <Shadow
                    distance={2}
                    startColor="rgba(0, 0, 0, 0.1)"
                    finalColor="rgba(0, 0, 0, 0)"
                  >
                    <View style={styles.circle}>
                      <Pen width={18} height={18} />
                    </View>
                  </Shadow>
                  <Text style={styles.buttonText}>작성한 글</Text>
                </TouchableOpacity>
              </View>
            </Shadow>
          </View>
          {/* content */}
          <View style={styles.contentContainer}>
            {/* my travelInning */}
            <Text style={styles.subTitle}>나의 트래블이닝</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[0, 1, 2, 3, 4, 5]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item, index }) =>
                index > 0 ? (
                  <View style={{ alignItems: "center" }}>
                    <View>
                      <TouchableOpacity>
                        <Shadow
                          distance={2}
                          startColor="rgba(0, 0, 0, 0.1)"
                          finalColor="rgba(0, 0, 0, 0)"
                        >
                          <Image
                            source={require("../../assets/images/gowith/logo.png")}
                            style={styles.travelImage}
                          />
                        </Shadow>
                      </TouchableOpacity>
                      <Image
                        source={require("../../assets/images/clubs/doosan.png")}
                        style={styles.travelLogoCircle}
                      />
                    </View>
                    <Text style={styles.date}>23년 10월 27일</Text>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity activeOpacity={0.5}>
                      <Shadow
                        distance={2}
                        startColor="rgba(0, 0, 0, 0.1)"
                        finalColor="rgba(0, 0, 0, 0)"
                      >
                        <View style={styles.travelImage}>
                          <Plus width={12} height={12} />
                        </View>
                      </Shadow>
                    </TouchableOpacity>
                    <View style={styles.travelCircle} />
                  </View>
                )
              }
              contentContainerStyle={styles.travelContainer}
            />
            {/* my activity */}
            <Text style={styles.subTitle}>나의 활동</Text>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 16,
              }}
            >
              <Shadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.1)"
                finalColor="rgba(0, 0, 0, 0)"
                style={{ width: "100%" }}
              >
                <View style={styles.activityContainer}>
                  {activitys.map((activity, index) => {
                    return (
                      <TouchableOpacity key={index} style={styles.rowContainer}>
                        <View style={theme.rowContainer}>
                          <Image
                            source={activity.image}
                            style={styles.activityIcon}
                          />
                          <Text style={styles.activityText}>
                            {activity.text}
                          </Text>
                        </View>
                        <Arrow />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </Shadow>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    maxHeight: 390,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "30%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  setting: {
    width: 17,
    height: 17,
    resizeMode: "contain",
    marginRight: 14,
  },
  profileImage: {
    width: 107,
    height: 107,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: 20,
  },
  profileText: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 22,
    color: theme.main_black,
    marginTop: 8,
  },
  translucentContainer: {
    flexDirection: "row",
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    borderRadius: 20,
    backgroundColor: "#FFFFFF70",
  },
  circle: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "white",
  },
  buttonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    marginTop: 6,
    color: theme.main_black,
  },
  line: {
    width: 1,
    height: 32,
    backgroundColor: theme.gray200,
  },
  contentContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: theme.gray100,
  },
  subTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 15,
    color: theme.main_black,
    marginHorizontal: 20,
    marginTop: 20,
  },
  travelContainer: {
    flexDirection: "row",
    gap: 14,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  travelImage: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F5F6F8",
    resizeMode: "cover",
  },
  travelCircle: {
    width: 22,
    height: 22,
    borderRadius: 30,
    backgroundColor: "#919191",
    position: "absolute",
    right: -4,
    bottom: 16,
  },
  travelLogoCircle: {
    maxWidth: 30,
    maxHeight: 30,
    position: "absolute",
    right: -6,
    bottom: -4,
    transform: [{ rotate: "20deg" }],
    resizeMode: "contain",
  },
  date: {
    fontFamily: "Pretendard-Medium",
    fontSize: 9,
    color: theme.main_black,
    marginTop: 6,
  },
  activityContainer: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 36,
  },
  activityText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: theme.main_black,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
    marginRight: 8,
  },
});
