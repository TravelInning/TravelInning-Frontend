import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../colors/color";
import DropDown from "../../../assets/icon/story/dropdown.svg";
import { useEffect, useRef, useState } from "react";
import { DateModal } from "../../../component/MyPage/MyPageComp";
import Plus from "../../../assets/icon/mypage/plus.svg";
import { Shadow } from "react-native-shadow-2";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadClub } from "../../../api/club/club";
import { homeClubMapping } from "../../../constants/mapping";
import { saveMyTravelInning } from "../../../api/mypage/myTravelInning";
import { showToast } from "../../../component/Toast";

export default function MyTravelinningScreen({ navigation }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [day, setDay] = useState(currentDate.getDate());
  const [image, setImage] = useState(null);
  const [rivalClub, setRivalClub] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [memo, setMemo] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // modal
  const [currentSelected, setCurrentSelected] = useState("year");
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const yearButtonRef = useRef(null);
  const monthButtonRef = useRef(null);
  const dayButtonRef = useRef(null);
  const openModal = (ref) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ top: pageY + height, left: pageX, width: width });
        setModalVisible(true);
      });
    }
  };

  // keyboard detect
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const data = await loadClub();
      const id = Number(data?.result?.teamId);
      setTeamId(Number.isFinite(id) ? id : null);
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsMultipleSelection: true,
      selectionLimit: 1,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (submitting) return;
    if (!rivalClub) {
      showToast?.("경기 구단을 선택해 주세요.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await saveMyTravelInning({
        date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
          2,
          "0"
        )}`,
        opponentTeamId: Number(rivalClub),
        content: memo?.trim() || "",
        imageUri: image,
      });

      if (res && res.isSuccess) {
        showToast?.("등록되었습니다!");
        navigation.goBack();
      } else {
        showToast?.(res?.message || "등록에 실패했어요.");
      }
    } catch (e) {
      showToast?.("네트워크 오류가 발생했어요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      {!isKeyboardVisible && (
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={styles.subTitle}>나의 트래블이닝</Text>
            <TouchableOpacity disabled={submitting} onPress={onSubmit}>
              <Text style={[styles.subTitle, { color: theme.main_blue }]}>
                작성 완료
              </Text>
            </TouchableOpacity>
          </View>
          {/* date selector */}
          <View style={styles.filterContainer}>
            <Pressable
              ref={yearButtonRef}
              onPress={() => {
                setCurrentSelected("year");
                openModal(yearButtonRef);
              }}
              style={({ pressed }) => [
                styles.filterButton,
                { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
              ]}
            >
              <Text style={styles.filterButtonText}>{year}</Text>
              <DropDown style={styles.dropdown} />
            </Pressable>
            <Pressable
              ref={monthButtonRef}
              onPress={() => {
                setCurrentSelected("month");
                openModal(monthButtonRef);
              }}
              style={({ pressed }) => [
                styles.filterButton,
                { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
              ]}
            >
              <Text style={styles.filterButtonText}>{month}</Text>
              <DropDown style={styles.dropdown} />
            </Pressable>
            <Pressable
              ref={dayButtonRef}
              onPress={() => {
                setCurrentSelected("day");
                openModal(dayButtonRef);
              }}
              style={({ pressed }) => [
                styles.filterButton,
                { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
              ]}
            >
              <Text style={styles.filterButtonText}>{day}</Text>
              <DropDown style={styles.dropdown} />
            </Pressable>
          </View>
          <DateModal
            visible={modalVisible}
            buttonPosition={buttonPosition}
            onClose={() => setModalVisible(false)}
            year={year}
            month={month}
            day={day}
            setYear={setYear}
            setMonth={setMonth}
            setDay={setDay}
            currentSelected={currentSelected}
          />
          {/* photo */}
          <Pressable
            onPress={pickImage}
            style={({ pressed }) => [
              styles.photoContainer,
              { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
            ]}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 5,
                }}
              />
            ) : (
              <Plus width={12} height={12} />
            )}
          </Pressable>
        </View>
      )}
      <View style={styles.border} />
      <View style={styles.container}>
        {/* club vs club */}
        <View style={styles.rowContainer}>
          {/* my */}
          <View style={{ alignItems: "center" }}>
            <Image
              source={
                teamId
                  ? homeClubMapping[teamId - 1].imgSrc
                  : require("../../../assets/images/clubs/lotte.png")
              }
              style={styles.clubImage}
            />
            <Text style={styles.myclubText}>나의 구단</Text>
          </View>
          <Text
            style={{ ...styles.subTitle, marginHorizontal: 40, marginTop: 10 }}
          >
            VS
          </Text>
          {/* rival */}
          <View style={{ alignItems: "center" }}>
            {rivalClub ? (
              <Pressable
                onPress={() => {
                  navigation.navigate("SelectClub", {
                    from: "myTravelInning",
                    setRivalClub: setRivalClub,
                  });
                }}
              >
                <Image
                  source={homeClubMapping[rivalClub - 1].imgSrc}
                  style={styles.clubImage}
                />
              </Pressable>
            ) : (
              <Shadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.1)"
                finalColor="rgba(0, 0, 0, 0)"
                style={{ borderRadius: 30 }}
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate("SelectClub", {
                      from: "myTravelInning",
                      setRivalClub: setRivalClub,
                    });
                  }}
                  style={({ pressed }) => [
                    styles.circle,
                    { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
                  ]}
                />
              </Shadow>
            )}
            <Text style={styles.myclubText}>경기 구단</Text>
          </View>
        </View>
        {/* memo */}
        <Text
          style={{
            ...styles.subTitle,
            alignSelf: "flex-start",
            marginTop: 24,
          }}
        >
          메모 남기기
        </Text>
        <View style={styles.memoContainer}>
          <TextInput
            placeholder="트래블이닝의 추억을 잊지 말고 남겨봐요!"
            multiline={true}
            style={styles.textinput}
            onChangeText={setMemo}
            returnKeyType="done"
          />
          <Text style={styles.textLength}>
            <Text style={{ color: theme.main_black }}>{memo.length}</Text> | 300
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 15,
    color: theme.main_black,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 60,
  },
  border: {
    width: "100%",
    height: 8,
    backgroundColor: "#F4F4F4",
    marginVertical: 10,
  },
  // date filter
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 20,
    marginTop: 16,
  },
  filterButton: {
    flexDirection: "row",
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 15,
    fontFamily: "Pretendard-SemiBold",
    color: theme.main_black,
  },
  // photo
  photoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 24,
  },
  // club
  clubImage: {
    maxWidth: 40,
    maxHeight: 36,
    resizeMode: "contain",
  },
  myclubText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: theme.main_black,
    marginTop: 10,
  },
  circle: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: "#F5F6F8",
  },
  // memo
  memoContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#F5F6F8",
    marginTop: 14,
    marginBottom: 10,
    padding: 14,
  },
  textinput: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    textAlignVertical: "top",
    textAlign: "left",
  },
  textLength: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#C2C2C2",
    alignSelf: "flex-end",
  },
});
