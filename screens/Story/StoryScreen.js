// src/screen/Story/StoryScreen.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { WriteButton } from "../../component/Companion/CompanionComp";
import { theme } from "../../colors/color";
import DropDown from "../../assets/icon/dropdown.svg";
import DropDowBlue from "../../assets/icon/companion/dropdown.svg";
import StoryBox from "../../component/Story/StoryBox";
import TopCarousel from "../../component/Story/TopCarousel";
import FilterDropDown from "../../component/Story/FilterDropDown";
import { loadStoryRoomList } from "../../api/storyroom/room";
import {
  addStoryPostScrap,
  cancelStoryPostScrap,
} from "../../api/storyroom/scrap";
import { addStoryPostBlock } from "../../api/storyroom/block";
import { useIsFocused } from "@react-navigation/native";
import { showToast } from "../../component/Toast";

const filterMap = {
  filter1: { 전체: null, 최신순: "LATEST", 스크랩: "SCRAP" },
  filter2: {
    "전체 조건": null,
    이야기해요: "IN_PROGRESS",
    끝난이야기: "ENDED",
  },
  filter3: {
    "전체 조건": null,
    야구: "BASEBALL",
    연애: "LOVE",
    일상: "DAILY",
    뉴스: "NEWS",
  },
};

export default function StoryScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [activeSlide, setActiveSlide] = useState(0);
  const [filter1, setFilter1] = useState("최신순");
  const [filter2, setFilter2] = useState("전체 조건");
  const [filter3, setFilter3] = useState("전체 조건");
  const [filterVisible, setFilterVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filter1ButtonRef = useRef(null);
  const filter2ButtonRef = useRef(null);
  const filter3ButtonRef = useRef(null);
  const [rooms, setRooms] = useState([]);

  const openModal = (ref, filterName) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ top: pageY + height, left: pageX });
        setFilterVisible(true);
        setSelectedFilter(filterName);
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await loadStoryRoomList({
        status: filterMap.filter2[filter2],
        sortType: filterMap.filter1[filter1],
        topic: filterMap.filter3[filter3],
      });
      setRooms(data || []);
    })();
  }, [filter1, filter2, filter3, isFocused]);

  const handleToggleScrap = useCallback(async (id, next) => {
    try {
      const ok = next
        ? await addStoryPostScrap(id)
        : await cancelStoryPostScrap(id);
      if (!ok) return;
      setRooms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, scrapped: next } : p))
      );
    } catch {
      showToast("스크랩 오류! 다시 시도해주세요.");
    }
  }, []);

  const handleBlockRoom = useCallback(async (id) => {
    const ok = await addStoryPostBlock(id);
    if (ok) setRooms((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const topData = rooms.slice(0, 3);

  const renderStoryItem = useCallback(
    ({ item }) => (
      <StoryBox
        item={item}
        onToggleScrap={handleToggleScrap}
        onBlockRoom={handleBlockRoom}
      />
    ),
    [handleToggleScrap, handleBlockRoom]
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopCarousel
        data={topData}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        onToggleScrap={handleToggleScrap}
        onBlockRoom={handleBlockRoom}
        filterVisible={filterVisible}
      />
      <View style={styles.filterContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            ref={filter1ButtonRef}
            onPress={() => openModal(filter1ButtonRef, "filter1")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={[
                styles.filterText,
                filter1 !== "전체" && { color: theme.main_blue },
              ]}
            >
              {filter1}
            </Text>
            {filter1 !== "전체" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
          <TouchableOpacity
            ref={filter2ButtonRef}
            onPress={() => openModal(filter2ButtonRef, "filter2")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 18,
            }}
          >
            <Text
              style={[
                styles.filterText,
                filter2 !== "전체 조건" && { color: theme.main_blue },
              ]}
            >
              {filter2}
            </Text>
            {filter2 !== "전체 조건" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
          <TouchableOpacity
            ref={filter3ButtonRef}
            onPress={() => openModal(filter3ButtonRef, "filter3")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 18,
            }}
          >
            <Text
              style={[
                styles.filterText,
                filter3 !== "전체 조건" && { color: theme.main_blue },
              ]}
            >
              {filter3}
            </Text>
            {filter3 !== "전체 조건" ? <DropDowBlue /> : <DropDown />}
          </TouchableOpacity>
        </View>
        {filter1 === "전체" &&
        filter2 === "전체 조건" &&
        filter3 === "전체 조건" ? (
          <Image
            source={require("../../assets/images/companion/filter_reset.png")}
            style={styles.filterImage}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFilter1("최신순");
              setFilter2("전체 조건");
              setFilter3("전체 조건");
            }}
          >
            <Image
              source={require("../../assets/images/companion/filter_reset_on.png")}
              style={styles.filterImage}
            />
          </TouchableOpacity>
        )}
      </View>
      <FilterDropDown
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        buttonPosition={buttonPosition}
        selectedFilter={selectedFilter}
        setFilterState={
          selectedFilter === "filter1"
            ? setFilter1
            : selectedFilter === "filter2"
            ? setFilter2
            : setFilter3
        }
      />
      <FlatList
        data={rooms}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderStoryItem}
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 0,
        }}
      />
      <WriteButton onClick={() => navigation.navigate("StoryEdit")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
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
  filterImage: { width: 65, resizeMode: "contain" },
});
