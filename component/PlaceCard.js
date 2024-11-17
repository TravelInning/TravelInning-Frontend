import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Right from "../assets/icon/right_arrow.svg";
import ClipFalse from "../assets/icon/bookmark_false.svg";
import ClipTrue from "../assets/icon/bookmark_true.svg";
import SeeMore from "../assets/icon/see_more.svg";
import SeeMoreActivate from "../assets/icon/see_more_activate.svg";
import { theme } from "../colors/color";
import { Shadow } from "react-native-shadow-2";
import SeeMoreModal from "./SeeMoreModal";
import { useEffect, useRef, useState } from "react";

export default function PlaceCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clipState, setClipState] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log(clipState);
    handleClip();
  }, [clipState]);

  // 알림 모달 열기
  const openModal = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const handleClip = () => {
    // 나중에 저장 상태변경 코드
  };

  return (
    <Shadow distance={2} startColor="#00000015" endColor="#00000000">
      <View style={styles.placeContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log("장소 자세히보기")}
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 2,
              height: 71,
              justifyContent: "space-between",
              marginRight: 14,
            }}
          >
            <View>
              <Text style={styles.placeTitle}>용호만 유람선 터미널</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.placeContent}
              >
                광안대교나 오륙도를 구경하는 코스로 요트를 타볼 수 있는
                관광명소입니다.
              </Text>
            </View>
            <Text style={styles.placeDistance}>• 12km</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Image
              source={require("../assets/images/selectphoto/photo1_1.png")}
              style={styles.photo}
            />
          </View>
          <TouchableOpacity
            ref={buttonRef}
            onPress={openModal}
            style={{ marginLeft: 13 }}
          >
            <View
              style={{
                width: 17,
                height: 17,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: modalVisible ? "#EFF7FF" : "#fff",
                borderRadius: 30,
              }}
            >
              {modalVisible ? (
                <SeeMoreActivate width={13} height={13} />
              ) : (
                <SeeMore width={13} height={13} />
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            right: 43,
            bottom: 11,
          }}
        >
          <TouchableOpacity onPress={() => setClipState(!clipState)}>
            {clipState ? (
              <ClipTrue width={10} height={13} />
            ) : (
              <ClipFalse width={11} height={14} />
            )}
          </TouchableOpacity>
        </View>
        <SeeMoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonPosition={buttonPosition}
        />
      </View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeContainer: {
    flexDirection: "row",
    width: "100%",
    height: 101,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingLeft: 18,
    paddingRight: 13,
    paddingVertical: 16,
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: 50,
    resizeMode: "cover",
    borderRadius: 6,
  },
  placeTitle: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: "#000",
  },
  placeContent: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
  placeDistance: {
    fontSize: 10,
    fontFamily: "Pretendard-Medium",
    color: theme.gray,
  },
});
