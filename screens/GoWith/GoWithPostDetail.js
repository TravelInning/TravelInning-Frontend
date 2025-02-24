import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, ImageBackground } from 'react-native';

const GoWithPostDetail = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 21, paddingLeft: 35, paddingRight: 20 }}>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 22, paddingHorizontal: 20 }}>
          <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 8, height: 15 }} />
          <View style={{ flex: 1 }} />
          <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 15, height: 15, marginRight: 20 }} />
          <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 15, height: 3 }} />
        </View>

        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, marginRight: 260 }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#EEF7FF', borderRadius: 3, paddingVertical: 6 }}>
              <Text style={{ color: '#0083FF', fontSize: 8, fontWeight: 'bold' }}>직관동행</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#0083FF', borderRadius: 6, paddingVertical: 4, marginVertical: 4 }}>
              <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 5, height: 5, marginLeft: 4, marginRight: 2 }} />
              <Text style={{ color: '#FFFFFF', fontSize: 8, fontWeight: 'bold', flex: 1 }}>구하는중</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 40, height: 40, marginRight: 5 }} />
            <View style={{ marginVertical: 6 }}>
              <Text style={{ color: '#1B1D28', fontSize: 14, fontWeight: 'bold', marginBottom: 6 }}>최강삼성</Text>
              <Text style={{ color: '#9B9B9B', fontSize: 8, fontWeight: 'bold' }}>2시간 전</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ marginVertical: 6 }}>
              <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 22, height: 22, marginBottom: 6, marginHorizontal: 5 }} />
              <Text style={{ color: '#0083FF', fontSize: 9, fontWeight: 'bold' }}>대화하기</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 22, marginBottom: 11, marginHorizontal: 20 }}>
          <Text style={{ color: '#1B1D28', fontSize: 16, fontWeight: 'bold', marginBottom: 13 }}>동행 2명 구해요</Text>
          <Text style={{ color: '#545454', fontSize: 16, fontWeight: 'bold', marginRight: 88 }}>
            삼성 vs KIA 경기 보러갑니다.{"\n"}
            같은 성별만 원합니다.{"\n\n"}
            아 전 참고로 삼성팬인데요{"\n"}
            뭐,, 기아팬이 지원주셔도 큰 상관은 없어요.
          </Text>
        </View>

        <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ width: 15, height: 20, marginBottom: 12, marginLeft: 358 }} />

        <View style={{ height: 10, backgroundColor: '#ECECEC', marginBottom: 21 }} />

        <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ borderRadius: 3, height: 200, marginBottom: 20, marginHorizontal: 20 }} />

        <ImageBackground source={require('../../assets/images/gowith/back-icon.png')} resizeMode='stretch' imageStyle={{ borderRadius: 3 }} style={{ paddingTop: 8, paddingBottom: 122, marginHorizontal: 20 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Image source={require('../../assets/images/gowith/back-icon.png')} style={{ height: 70 }} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoWithPostDetail;
