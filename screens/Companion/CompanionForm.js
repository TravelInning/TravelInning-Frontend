import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import { theme } from "../../colors/color";
import { Header } from "../../component/Header/Header";
import Close from "../../assets/icon/story/close_blue.svg";
import { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import CancleConfirmModal from "../../component/CancleConfirmModal";
import { createPost, updatePost } from "../../api/companion/post";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "../../component/Toast";

export default function CompanionForm({ navigation, route }) {
  const mode = route?.params?.mode ?? "create";
  const post = route?.params?.post ?? null;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [titleText, setTitleText] = useState(post?.title ?? "");
  const [contentText, setContentText] = useState(post?.content ?? "");

  const [images, setImages] = useState(post?.imageUrls ?? []);

  // keyboard detector
  useLayoutEffect(() => {
    const showL = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideL = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showL.remove();
      hideL.remove();
    };
  }, []);

  const pickImage = async () => {
    const remain = Math.max(0, 5 - images.length);
    if (remain === 0) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsMultipleSelection: true,
      selectionLimit: remain,
      quality: 1,
    });
    if (!result.canceled) {
      const locals = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...locals].slice(0, 5));
    }
  };

  const renderImageItem = (uri) => (
    <View
      key={uri}
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
        source={{ uri }}
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

  const isLocal = (uri) => !/^https?:\/\//i.test(uri);

  const handleSubmit = async () => {
    if (!titleText || !contentText) {
      showToast("제목과 내용을 입력해주세요.");
      return;
    }

    const localImages = images.filter(isLocal);

    if (mode === "create") {
      await createPost({
        title: titleText,
        content: contentText,
        images: localImages,
      });
      navigation.goBack();
      return;
    }

    // edit
    const ok = await updatePost({
      postId: post.id,
      title: titleText,
      content: contentText,
      status: post.status,
      postType: post.postType || "Baseball",
      images: localImages,
    });

    if (ok) {
      navigation.replace("CompanionPostDetail", { id: post.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title={mode === "edit" ? "수정하기" : "작성하기"} right="none" />
      <View style={styles.editContainer}>
        {/* notice */}
        {noticeVisible && mode !== "edit" && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setNoticeVisible(false)}
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

        {/* inputs */}
        <TextInput
          placeholder="제목을 입력하세요."
          style={styles.titleInput}
          value={titleText}
          onChangeText={setTitleText}
          returnKeyType="done"
        />
        <TextInput
          placeholder="여기를 눌러 나의 동행을 구해보세요."
          multiline
          style={styles.textinput}
          value={contentText}
          onChangeText={setContentText}
          returnKeyType="done"
        />

        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={contentText.length <= 0 || titleText.length <= 0}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}
              style={[
                styles.button,
                (titleText.length <= 0 || contentText.length <= 0) && {
                  backgroundColor: "#F3F3F3",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  (titleText.length <= 0 || contentText.length <= 0) && {
                    color: "#B8B8B8",
                  },
                ]}
              >
                완료
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* image picker bar */}
      {!isKeyboardVisible && (
        <View style={styles.imageContainer}>
          <View style={styles.slide} />
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
                source={require("../../assets/images/companion/camera-icon.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ color: "#909090", fontSize: 12 }}>
                {images.length}/5
              </Text>
            </TouchableOpacity>

            {images.map((uri) => renderImageItem(uri))}
            {renderEmptyImageSlots()}
          </ScrollView>
        </View>
      )}

      <CancleConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        text={
          mode === "edit" ? "글을 수정하시겠습니까?" : "글을 작성하시겠습니까?"
        }
        onClick={() => {
          handleSubmit();
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    marginBottom: 4,
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
  titleInput: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    textAlignVertical: "top",
    textAlign: "left",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 1,
  },
  textinput: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    textAlignVertical: "top",
    textAlign: "left",
  },
  buttonContainer: { width: "100%", alignItems: "center", marginBottom: 20 },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    borderRadius: 9,
    backgroundColor: theme.main_blue,
  },
  buttonText: { fontSize: 20, fontFamily: "Pretendard-Bold", color: "white" },
  imageContainer: {
    width: "100%",
    paddingVertical: 16,
    zIndex: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#eaeaea",
  },
  slide: {
    width: 60,
    height: 6,
    backgroundColor: theme.gray200,
    borderRadius: 30,
    alignSelf: "center",
  },
});
