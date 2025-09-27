import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ClipFalse from "../../assets/icon/bookmark_false.svg";
import ClipTrue from "../../assets/icon/bookmark_true.svg";
import SeeMore from "../../assets/icon/see_more.svg";
import SeeMoreActivate from "../../assets/icon/see_more_activate.svg";
import { Shadow } from "react-native-shadow-2";
import SeeMoreModal from "../SeeMoreModal";
import { useEffect, useRef, useState } from "react";
import {
  addPlaceScrap,
  cancelPlaceScrap,
  loadPlaceScrap,
} from "../../api/place/scrap";
import { theme } from "../../colors/color";

export default function PlaceCard({ place, isHaveScrap = true, modalOptions }) {
  const { id, thumbnailUrl, imageUrl, name } = place;
  const [modalVisible, setModalVisible] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchScrap = async () => {
      try {
        const data = await loadPlaceScrap(id);
        setIsScrap(data);
      } catch (e) {
        console.log("load scrap error", e);
      }
    };

    if (isHaveScrap) fetchScrap();
  }, []);

  const openModal = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ top: pageY - 10 });
    });
    setModalVisible(!modalVisible);
  };

  const toggleScrap = async () => {
    try {
      if (isScrap) {
        await cancelPlaceScrap(id);
      } else {
        await addPlaceScrap(id);
      }
      setIsScrap(!isScrap);
    } catch (e) {
      showToast("스크랩 오류! 다시 시도해주세요.");
    }
  };

  return (
    <Shadow distance={2} startColor="#00000015" endColor="#00000000">
      <View style={styles.placeContainer}>
        <View style={{ flex: 2.5, marginRight: 16 }}>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : thumbnailUrl
                ? { uri: thumbnailUrl }
                : require("../../assets/images/companion/logo.png")
            }
            style={styles.photo}
          />
        </View>
        <View style={styles.textContents}>
          <Text style={styles.placeTitle}>{name}</Text>
          {isHaveScrap ? (
            !isScrap ? (
              <View>
                <Text style={[styles.likePlaceText, { marginBottom: 5 }]}>
                  해당 추천 플레이스가 마음에 드셨다면
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Shadow
                    distance={2}
                    startColor="#00000015"
                    endColor="#00000000"
                  >
                    <TouchableOpacity
                      onPress={toggleScrap}
                      style={styles.button}
                    >
                      <Text
                        style={[
                          styles.likePlaceText,
                          { color: theme.main_blue },
                        ]}
                      >
                        저장하기
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                  <Text style={styles.likePlaceText}>버튼을 눌러보세요!</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={[styles.likePlaceText, { marginBottom: 5 }]}>
                  추천 키워드가 변경되어도{" "}
                  <Text style={{ color: theme.main_blue }}>더보기 버튼</Text>을
                  통해
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Shadow
                    distance={2}
                    startColor="#00000015"
                    endColor="#00000000"
                  >
                    <TouchableOpacity
                      onPress={toggleScrap}
                      style={[styles.button, styles.button_active]}
                    >
                      <Text style={[styles.likePlaceText, styles.text_active]}>
                        저장완료
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                  <Text style={styles.likePlaceText}>
                    플레이스를 모아볼 수 있어요!
                  </Text>
                </View>
              </View>
            )
          ) : null}
        </View>

        <TouchableOpacity
          ref={buttonRef}
          onPress={openModal}
          style={{ marginLeft: 4 }}
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

        <SeeMoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          buttonPosition={buttonPosition}
          options={modalOptions}
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
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 15,
    paddingBottom: 10,
  },
  photo: {
    width: "100%",
    height: 76,
    resizeMode: "cover",
    borderRadius: 5,
  },
  textContents: {
    width: 143,
    justifyContent: "space-between",
    paddingBottom: 3,
    marginRight: 7,
  },
  placeTitle: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: "#000",
  },
  likePlaceText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 8,
    color: "#545454",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  button_active: {
    backgroundColor: theme.main_blue,
  },
  text_active: {
    color: "#fff",
    fontFamily: "Pretendard-SemiBold",
  },
});
