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
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 2,
              height: 71,
              marginRight: 14,
            }}
          >
            <Text style={styles.placeTitle}>{name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
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
        </View>
        {isHaveScrap && (
          <View
            style={{
              position: "absolute",
              right: 43,
              bottom: 11,
            }}
          >
            <TouchableOpacity onPress={toggleScrap}>
              {isScrap ? (
                <ClipTrue width={11} height={14} />
              ) : (
                <ClipFalse width={12} height={15} />
              )}
            </TouchableOpacity>
          </View>
        )}

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
    height: 101,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingLeft: 18,
    paddingRight: 13,
    paddingVertical: 16,
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
});
