import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { WriteButton } from "../../component/GoWith/GoWithComp";
import { SCREEN_WIDTH, theme } from "../../colors/color";
import { useEffect, useRef, useState } from "react";
import { StoryBox } from "../../component/Story/StoryComp";
import Carousel from "react-native-reanimated-carousel";
import DropDown from "../../assets/icon/dropdown.svg";
import DropDowBlue from "../../assets/icon/gowith/dropdown.svg";
import { FilterDropDown } from "../../component/Story/StoryComp";
import { StoryCarousel } from "../../component/Story/StoryComp";

export default function StoryScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const [filter1State, setFilter1State] = useState("전체");
  const [filter2State, setFilter2State] = useState("전체 조건");
  const [filter3State, setFilter3State] = useState("전체 조건");
  const [filterVisible, setFilterVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filter1ButtonRef = useRef(null);
  const filter2ButtonRef = useRef(null);
  const filter3ButtonRef = useRef(null);

  const openModal = (ref, filterName) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ top: pageY + height, left: pageX });
        setFilterVisible(true);
        setSelectedFilter(filterName);
      });
    }
  };

  const DATA = [
    {
      id: "1",
      category: "야구",
      time: "11분 전",
      content:
        "한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니까 앞으로 잘 하면 될거같은데",
      limitedTime: "14:59",
      photo: require("../../assets/images/gowith/logo.png"),
    },
    {
      id: "2",
      category: "농구",
      time: "5분 전",
      content: "어제 경기 미쳤다.. 마지막 3점슛 대박",
      limitedTime: "13:20",
      photo: require("../../assets/images/gowith/logo.png"),
    },
    {
      id: "3",
      category: "축구",
      time: "20분 전",
      content: "이번 시즌 손흥민 폼 장난 아닌 듯",
      limitedTime: "12:45",
      photo: require("../../assets/images/gowith/logo.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* top3 */}
      <View
        style={{
          ...styles.topContainer,
          pointerEvents: filterVisible ? "none" : "auto",
        }}
      >
        {/* story box */}
        <Carousel
          loop
          width={SCREEN_WIDTH}
          height={200}
          autoPlay={true}
          data={[0, 1, 2]}
          scrollAnimationDuration={2000}
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ item }) => (
            <View
              key={item}
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingTop: 16,
                paddingBottom: 12,
              }}
            >
              <StoryBox
                category="야구"
                time="11분 전"
                content="한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니까 앞으로 잘 하면 될거같은데"
                limitedTime="14:59"
                photo={require("../../assets/images/gowith/logo.png")}
              />
            </View>
          )}
          style={{ height: 106 }}
        />
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          {[0, 1, 2].map((data) => (
            <View
              key={data}
              style={[
                styles.dot,
                data === activeSlide && { backgroundColor: theme.main_blue },
              ]}
            />
          ))}
        </View>
        {/* <StoryCarousel data={DATA} /> */}
      </View>
      {/* filter */}
      <View style={styles.filterContainer}>
        <View style={theme.rowContainer}>
          {/* filter1 */}
          <TouchableOpacity
            ref={filter1ButtonRef}
            onPress={() => openModal(filter1ButtonRef, "filter1")}
            style={theme.rowContainer}
          >
            <Text
              style={[
                styles.filterText,
                filter1State !== "전체" && { color: theme.main_blue },
              ]}
            >
              {filter1State}
            </Text>
            {filter1State !== "전체" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
          {/* filter2 */}
          <TouchableOpacity
            ref={filter2ButtonRef}
            onPress={() => openModal(filter2ButtonRef, "filter2")}
            style={{ ...theme.rowContainer, marginLeft: 18 }}
          >
            <Text
              style={[
                styles.filterText,
                filter2State !== "전체 조건" && { color: theme.main_blue },
              ]}
            >
              {filter2State}
            </Text>
            {filter2State !== "전체 조건" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
          {/* filter3 */}
          <TouchableOpacity
            ref={filter3ButtonRef}
            onPress={() => openModal(filter3ButtonRef, "filter3")}
            style={{ ...theme.rowContainer, marginLeft: 18 }}
          >
            <Text
              style={[
                styles.filterText,
                filter3State !== "전체 조건" && { color: theme.main_blue },
              ]}
            >
              {filter3State}
            </Text>
            {filter3State !== "전체 조건" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
        </View>
        {/* filter reset */}
        {filter1State === "전체" && filter2State === "전체 조건" ? (
          <Image
            source={require("../../assets/images/gowith/filter_reset.png")}
            style={styles.filterImage}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFilter1State("전체");
              setFilter2State("전체 조건");
            }}
          >
            <Image
              source={require("../../assets/images/gowith/filter_reset_on.png")}
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
          selectedFilter === "filter1"
            ? setFilter1State
            : selectedFilter === "filter2"
            ? setFilter2State
            : setFilter3State
        }
      />
      {/* list */}
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <StoryBox
              category="야구"
              time="11분 전"
              content="한화는 언제쯤 우승해볼 수 있을까? 좋은 선수들은 많이 가지고 있으니까 앞으로 잘 하면 될거같은데"
              limitedTime="14:59"
              photo={require("../../assets/images/gowith/logo.png")}
            />
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 0,
        }}
      />
      {/* write button */}
      <WriteButton onClick={() => navigation.navigate("StoryEdit")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    borderColor: theme.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 30,
    backgroundColor: "#EDEDED",
    marginHorizontal: 5,
  },
  filterContainer: {
    flexDirection: "row",
    width: "100%",
    height: 52,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
});
