import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const FindCompanionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    let newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 안내 문구 */}
      <View
        style={{
          backgroundColor: "#0083FF1A",
          borderRadius: 5,
          paddingVertical: 13,
          paddingHorizontal: 10,
          marginBottom: 22,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ color: "#006ED6", fontSize: 14, marginBottom: 10 }}>
          글을 작성하기 전에 알려드려요.
        </Text>
        <Text style={{ color: "#0083FF", fontSize: 13 }}>
          타인에게 불쾌감과 모욕감을 주는 내용의 글은 올릴 수 없으며,{"\n"}
          법령을 위반한 게시물은 관련 법률에 따라 처벌받을 수 있습니다.
        </Text>
      </View>

      {/* 제목 입력 */}
      <Text
        style={{
          color: "#9B9B9B",
          fontSize: 16,
          marginBottom: 11,
          marginLeft: 20,
        }}
      >
        제목을 입력해주세요. (최대 20자)
      </Text>
      <TextInput
        style={{
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#F4F4F4",
          marginBottom: 11,
          marginHorizontal: 20,
          fontSize: 16,
        }}
        maxLength={20}
        placeholder="제목을 입력하세요."
        value={title}
        onChangeText={setTitle}
      />

      {/* 내용 입력 */}
      <TextInput
        style={{
          color: "#1B1D28",
          fontSize: 16,
          marginBottom: 20,
          marginHorizontal: 20,
          minHeight: 100,
          textAlignVertical: "top",
        }}
        placeholder="여기를 눌러 나의 동행을 구해보세요."
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* 완료 버튼 */}
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: title || content ? "#0083FF" : "#F5F6F8",
          borderRadius: 10,
          paddingVertical: 19,
          marginBottom: 40,
          marginHorizontal: 20,
        }}
        onPress={() => Alert.alert("작성 완료!")}
        disabled={!title && !content}
      >
        <Text
          style={{
            color: title || content ? "#FFFFFF" : "#C2C2C2",
            fontSize: 18,
          }}
        >
          완료
        </Text>
      </TouchableOpacity>

      {/* 사진 업로드 섹션 */}
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: 110,
                height: 134,
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
                marginRight: 10,
                position: "relative",
                shadowColor: "#00000040",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 2,
                elevation: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "#FF0000",
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => removeImage(index)}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                backgroundColor: "#ECECEC",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
              onPress={pickImage}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
                }}
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ color: "#909090", fontSize: 12 }}>
                {images.length}/5
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FindCompanionForm;