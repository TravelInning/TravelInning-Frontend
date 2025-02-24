import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../../colors/color';
import { Shadow } from 'react-native-shadow-2';
import Search from '../../assets/icon/gowith/search.svg';
import Scrap from '../../assets/icon/bookmark_true.svg';
import {
  PostCard,
  Story,
  FilterDropDown,
} from '../../component/GoWith/GoWithComp';
import DropDown from '../../assets/icon/dropdown.svg';
import DropDowBlue from '../../assets/icon/gowith/dropdown.svg';
import { useRef, useState } from 'react';
import CancleConfirmModal from '../../component/CancleConfirmModal';
import Pen from '../../assets/icon/gowith/pen.svg';
import { useNavigation } from '@react-navigation/native';

export default function GoWithScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [filter1State, setFilter1State] = useState('전체');
  const [filter2State, setFilter2State] = useState('전체 조건');
  const [filterVisible, setFilterVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filter1ButtonRef = useRef(null);
  const filter2ButtonRef = useRef(null);

  const openModal = (ref, filterName) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ top: pageY + height, left: pageX });
        setFilterVisible(true);
        setSelectedFilter(filterName);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {/* search */}
        <View style={{ paddingHorizontal: 20 }}>
          <Shadow
            distance={2}
            startColor="rgba(0, 0, 0, 0.1)"
            finalColor="rgba(0, 0, 0, 0)"
            style={{ width: '100%', marginBottom: 20 }}
          >
            <View style={styles.searchContainer}>
              <Search width={12} height={12} style={{ marginRight: 4 }} />
              <TextInput
                placeholder="키워드로 동행찾기"
                style={styles.searchInput}
              />
            </View>
          </Shadow>
        </View>
        {/* story */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.circle}>
              <Scrap width={16} height={21} />
            </View>
            <Text style={styles.storyText}>스크랩한 글</Text>
          </View>
          <View style={styles.line} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 10 }}
          >
            <Story text="게시글 제목입니다" state="inProgress" />
            <Story text="게시글 제목입니다" state="done" />
            <Story text="게시글 제목입니다" state="ended" />
            <Story text="게시글 제목입니다" state="ended" />
            <Story text="게시글 제목입니다" state="ended" />
          </ScrollView>
        </View>
      </View>
      {/* filter */}
      <View style={styles.filterContainer}>
        <View style={theme.rowContainer}>
          {/* filter1 */}
          <TouchableOpacity
            ref={filter1ButtonRef}
            onPress={() => openModal(filter1ButtonRef, 'filter1')}
            style={theme.rowContainer}
          >
            <Text
              style={[
                styles.filterText,
                filter1State !== '전체' && { color: theme.main_blue },
              ]}
            >
              {filter1State}
            </Text>
            {filter1State !== '전체' ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
          {/* filter2 */}
          <TouchableOpacity
            ref={filter2ButtonRef}
            onPress={() => openModal(filter2ButtonRef, 'filter2')}
            style={{ ...theme.rowContainer, marginLeft: 18 }}
          >
            <Text
              style={[
                styles.filterText,
                filter2State !== '전체 조건' && { color: theme.main_blue },
              ]}
            >
              {filter2State}
            </Text>
            {filter2State !== '전체 조건' ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
        </View>
        {/* filter reset */}
        {filter1State === '전체' && filter2State === '전체 조건' ? (
          <Image
            source={require('../../assets/images/gowith/filter_reset.png')}
            style={styles.filterImage}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFilter1State('전체');
              setFilter2State('전체 조건');
            }}
          >
            <Image
              source={require('../../assets/images/gowith/filter_reset_on.png')}
              style={styles.filterImage}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* filterModal */}
      <FilterDropDown
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        buttonPosition={buttonPosition}
        selectedFilter={selectedFilter}
        setFilterState={
          selectedFilter === 'filter1' ? setFilter1State : setFilter2State
        }
      />
      {/* content */}
      <FlatList
        data={[
          { id: 1, isdone: true },
          { id: 2, isdone: false },
          { id: 3, isdone: false },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            title="게시글 제목 예를 들면 동행 2명 구해요"
            content="삼성 vs KIA 경기 보러갑니다. 같은 성별(남성)만 원합니다. 어쩌구 저쩌구 저쩌구 저쩌구어쩌구저"
            date="11.01"
            club="최강삼성"
            isDone={item.isdone}
            setDeleteModalVisible={setModalVisible}
          />
        )}
      />
      {/* delete modal */}
      <CancleConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        text={`한 번 삭제한 글은 복구할 수 없습니다.\n정말 삭제하시겠습니까?`}
        onClick={() => {}}
      />
      {/* write button */}
      <Pressable
        onPress={() => navigation.navigate('GoWithForm')}
        style={({ pressed }) => [
          styles.writeButton,
          { backgroundColor: pressed ? theme.gray50 : '#FFF' },
        ]}
      >
        <Pen />
        <Text style={styles.buttonText}>작성하기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topContainer: {
    paddingTop: 14,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    height: 42,
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
  },
  circle: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  storyText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 10,
    color: theme.main_black,
  },
  line: {
    width: 1,
    height: 35,
    backgroundColor: theme.borderColor,
    marginHorizontal: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: "row",
    width: "100%",
    height: 52,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
  },
  filterText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 13,
    color: "#545454",
    marginRight: 4,
  },
  filterImage: {
    width: 65,
    resizeMode: "contain",
  },
  writeButton: {
    flexDirection: "row",
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -60 }],
    borderWidth: 1,
    borderColor: theme.borderColor,

    // android shadow
    elevation: 2,
    // ios shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: theme.main_black,
    marginLeft: 6,
  },
});
