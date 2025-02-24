import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import Close from "../../assets/icon/story/close_blue.svg";
import DropDown from "../../assets/icon/story/dropdown.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Shadow } from "react-native-shadow-2";
import CheckFilterModal from "../../component/CheckFilterModal";

export default function StoryEditScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [contentText, setContentText] = useState("");
  const [images, setImages] = useState([]);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(true);
  const [filterNumber, setFilterNumber] = useState(1);
  const [category, setCategory] = useState("야구");
  const [limitedTime, setLimitedTime] = useState("제한시간");

  // test
  useEffect(() => {
    console.log(contentText);
  }, [contentText]);

  // keyboard detector
  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsMultipleSelection: true,
      selectionLimit: 5 - images.length,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(
        [...images, ...result.assets.map((asset) => asset.uri)].slice(0, 5)
      );
    }
  };

  const renderImageItem = ({ item }) => (
    <View
      key={item}
      style={{
        width: 110,
        height: 134,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: item }}
        style={{ width: "100%", height: "100%", borderRadius: 5 }}
      />
    </View>
  );

  const renderEmptyImageSlots = () => {
    const emptySlots = 5 - images.length;
    return Array.from({ length: emptySlots }).map((_, index) => (
      <View
        key={`empty-${index}`}
        style={{
          width: 110,
          height: 134,
          backgroundColor: "#FFFFFF",
          borderRadius: 5,
          marginRight: 10,
          borderWidth: 1,
          borderColor: "#E8E8E8",
        }}
      />
    ));
  };

  return (
    <SafeAreaView style={theme.container}>
      {/* Header */}
      <Header title="작성하기" right="none" />
      <View style={styles.editContainer}>
        {/* notice */}
        {noticeVisible && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setNoticeVisible(false);
            }}
            style={styles.noticeContainer}
          >
            <View
              style={[
                theme.rowContainer,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.noticeTitle}>
                글을 작성하기 전에 알려드려요.
              </Text>

              <Close style={{ marginRight: 4 }} />
            </View>
            <Text style={styles.noticeText}>
              타인에게 불쾌감과 모욕감을 주는 내용의 글은 올릴 수 없으며, 법령을
              위반한 게시물은 관련 법률에 따라 처벌받을 수 있습니다.
            </Text>
          </TouchableOpacity>
        )}
        {/* filter button */}
        <View
          style={[
            theme.rowContainer,
            {
              width: "100%",
              gap: 10,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              setFilterNumber(1);
              setFilterModalVisible(true);
            }}
            style={({ pressed }) => [
              styles.filterButton,
              { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
            ]}
          >
            <Text style={styles.filterButtonText}>{category}</Text>
            <DropDown style={styles.dropdown} />
          </Pressable>
          <Pressable
            onPress={() => {
              setFilterNumber(2);
              setFilterModalVisible(true);
            }}
            style={({ pressed }) => [
              styles.filterButton,
              { backgroundColor: pressed ? theme.gray300 : "#F5F6F8" },
            ]}
          >
            <Text style={styles.filterButtonText}>{limitedTime}</Text>
            <DropDown style={styles.dropdown} />
          </Pressable>
        </View>
        {/* edit */}
        <TextInput
          placeholder="나누고 싶은 이야기를 입력해주세요. (모든 이야기는 익명으로 나누지만, 타인에게 불쾌감과 모욕감을 주는 이야기로 신고가 들어온 경우 자동으로 숨김 처리 될 수 있습니다)"
          multiline={true}
          style={styles.textinput}
          onChangeText={setContentText}
          returnKeyType="done"
        />
        <Text style={styles.textLength}>{contentText.length}/315</Text>
        {/* confirm button */}
        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={contentText.length <= 0}
              activeOpacity={0.5}
              onPress={() => {}}
              style={[
                styles.button,
                contentText.length <= 0 && { backgroundColor: "#F3F3F3" },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  contentText.length <= 0 && { color: "#B8B8B8" },
                ]}
              >
                완료
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* image container */}
      {!isKeyboardVisible && (
        <Shadow
          distance={6}
          startColor="rgba(0, 0, 0, 0.1)"
          finalColor="rgba(0, 0, 0, 0)"
          offset={[0, 2]}
        >
          <View style={styles.imageContainer}>
            <View style={styles.slide} />
            {/* image upload */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
            >
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  width: 70,
                  height: 134,
                  backgroundColor: "#ECECEC",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  marginRight: 10,
                }}
              >
                <Image
                  source={require("../../assets/images/gowith/camera-icon.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={{ color: "#909090", fontSize: 12 }}>
                  {images.length}/5
                </Text>
              </TouchableOpacity>
              {images.map((uri, index) =>
                renderImageItem({ item: uri, index })
              )}
              {renderEmptyImageSlots()}
            </ScrollView>
          </View>
        </Shadow>
      )}
      <CheckFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        keywordArry={
          filterNumber === 1
            ? ["야구", "기사/뉴스", "일상", "성/연애"]
            : ["30분", "1시간", "2시간", "3시간"]
        }
        setSelected={filterNumber === 1 ? setCategory : setLimitedTime}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  noticeContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#0084FF10",
    marginBottom: 16,
  },
  noticeTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    color: theme.main_blue,
    marginBottom: 2,
  },
  noticeText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 13,
    color: theme.main_blue,
  },
  // filter button
  filterButton: {
    flexDirection: "row",
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    paddingHorizontal: 18,
  },
  filterButtonText: {
    fontSize: 15,
    fontFamily: "Pretendard-SemiBold",
    color: theme.main_black,
  },
  dropdown: { position: "absolute", right: 18, top: "50%" - 10 },
  // input
  textinput: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    textAlignVertical: "top",
    textAlign: "left",
    marginTop: 18,
    marginBottom: 12,
  },
  textLength: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: theme.gray500,
    alignSelf: "flex-end",
  },
  // confirm button
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    borderRadius: 9,
    backgroundColor: theme.main_blue,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
    color: "white",
  },
  // image
  imageContainer: {
    width: "100%",
    paddingTop: 16,
    zIndex: 20,
    backgroundColor: "#FFF",
  },
  slide: {
    width: 60,
    height: 6,
    backgroundColor: theme.gray200,
    borderRadius: 30,
    alignSelf: "center",
  },
});
