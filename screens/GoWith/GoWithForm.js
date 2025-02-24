import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GoWithForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const isFormComplete = title.trim().length > 0 && content.trim().length > 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5 - images.length,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)].slice(0, 5));
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={{ width: 110, height: 134, backgroundColor: '#FFFFFF', borderRadius: 5, marginRight: 10, borderWidth: 1, borderColor: '#E8E8E8', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: item }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
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
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#E8E8E8',
        }}
      />
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* 상단 바 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 8, height: 15 }} />
          </TouchableOpacity>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#1B1D28' }}>작성하기</Text>
        </View>
        {/* 안내 박스 */}
        <View style={{ backgroundColor: '#0083FF1A', borderRadius: 5, padding: 13, marginHorizontal: 20, marginBottom: 22 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#006ED6', fontWeight: 'bold' }}>글을 작성하기 전에 알려드려요.</Text>
            <Image source={require('../../assets/images/gowith/close-icon.png')} style={{ width: 12, height: 12 }} />
          </View>
          <Text style={{ marginTop: 10, color: '#0083FF', fontSize: 13 }}>
            타인에게 불쾌감과 모욕감을 주는 내용의 글은 올릴 수 없으며, 법령을 위반한 게시물은 관련 법률에 따라 처벌받을 수 있습니다.
          </Text>
        </View>

        {/* 제목 입력 */}
        <TextInput
          style={{ marginHorizontal: 20, color: '#1B1D28', fontSize: 16, height: 40, borderBottomWidth: 1, borderBottomColor: '#F4F4F4', marginBottom: 10 }}
          placeholder="제목을 입력해주세요.(최대 20자)"
          placeholderTextColor="#C2C2C2"
          maxLength={20}
          value={title}
          onChangeText={setTitle}
        />

        {/* 내용 입력 */}
        <TextInput
          style={{ marginHorizontal: 20, color: '#1B1D28', fontSize: 16, height: 200, textAlignVertical: 'top' }}
          placeholder="여기를 눌러 나의 동행을 구해보세요."
          placeholderTextColor="#C2C2C2"
          multiline
          value={content}
          onChangeText={setContent}
        />

        {/* 완료 버튼 */}
        <TouchableOpacity
          style={{
            backgroundColor: isFormComplete ? '#0084FF' : '#F5F6F8',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 40,
          }}
          disabled={!isFormComplete}
        >
          <Text style={{ color: isFormComplete ? '#FFFFFF' : '#C2C2C2', fontSize: 18 }}>완료</Text>
        </TouchableOpacity>

        {/* 이미지 업로드 박스 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <TouchableOpacity onPress={pickImage} style={{ width: 70, height: 134, backgroundColor: '#ECECEC', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginRight: 10 }}>
            <Image source={require('../../assets/images/gowith/camera-icon.png')} style={{ width: 24, height: 24 }} />
            <Text style={{ color: '#909090', fontSize: 12 }}>{images.length}/5</Text>
          </TouchableOpacity>
          {images.map((uri, index) => renderImageItem({ item: uri, index }))}
          {renderEmptyImageSlots()}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoWithForm;