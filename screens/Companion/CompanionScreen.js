import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../colors/color";
import { Shadow } from "react-native-shadow-2";
import Search from "../../assets/icon/companion/search.svg";
import Scrap from "../../assets/icon/bookmark_true.svg";
import { WriteButton } from "../../component/Companion/CompanionComp";
import DropDown from "../../assets/icon/dropdown.svg";
import DropDowBlue from "../../assets/icon/companion/dropdown.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  changePostState,
  deletePost,
  loadCompanionPosts,
  searchCompanionPosts,
} from "../../api/companion/post";
import { PostCard } from "../../component/Companion/PostCard";
import { addPostScrap, cancelPostScrap } from "../../api/companion/scrap";
import { FilterDropDown } from "../../component/Companion/FilterDropDown";
import Story from "../../component/Companion/Story";
import { showToast } from "../../component/Toast";
import { addPostBlock } from "../../api/companion/block";

const filterMap = {
  sortType: {
    전체: "LATEST",
    최신순: "LATEST",
    스크랩: "SCRAP",
  },
  statusFilter: {
    "전체 조건": "ALL",
    구했어요: "FOUND",
    구하는중: "FINDING",
  },
};

const sortCompanionStoryPosts = (list) => {
  return [...list].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "FINDING" ? -1 : 1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export default function CompanionScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [storyPosts, setStoryPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postLoadCondition, setPostLoadCondition] = useState({
    page: 0,
    size: 10,
    sortType: "LATEST",
    statusFilter: "ALL",
  });

  const [mode, setMode] = useState("LIST"); // "LIST", "SEARCH"
  const [keyword, setKeyword] = useState("");

  const [filter1State, setFilter1State] = useState("최신순");
  const [filter2State, setFilter2State] = useState("전체 조건");
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

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const content = await loadCompanionPosts({
          page: 0,
          size: 10,
          sortType: "SCRAP",
          statusFilter: "ALL",
        });
        if (content) {
          setStoryPosts(sortCompanionStoryPosts(content));
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) return;
    if (mode === "SEARCH") return;

    let cancelled = false;
    (async () => {
      const content = await loadCompanionPosts(postLoadCondition);
      if (!cancelled && content) setPosts(content);
    })();

    return () => {
      cancelled = true;
    };
  }, [isFocused, postLoadCondition, mode]);

  useEffect(() => {
    setPostLoadCondition((prev) => {
      const nextSort = filterMap.sortType[filter1State] ?? prev.sortType;
      const nextStatus =
        filterMap.statusFilter[filter2State] ?? prev.statusFilter;

      if (nextSort === prev.sortType && nextStatus === prev.statusFilter) {
        return prev;
      }
      return { ...prev, page: 0, sortType: nextSort, statusFilter: nextStatus };
    });
  }, [filter1State, filter2State]);

  const runSearch = useCallback(async () => {
    const q = keyword.trim();
    if (!q) return;

    setMode("SEARCH");

    setFilter1State("최신순");
    setFilter2State("전체 조건");
    setPostLoadCondition((prev) => ({
      ...prev,
      page: 0,
      sortType: "LATEST",
      statusFilter: "ALL",
    }));

    const content = await searchCompanionPosts({
      keyword: q,
      page: 0,
      size: 10,
      sort: "createdAt,DESC",
    });

    setPosts(content ?? []);
    showToast("검색되었습니다");
  }, [keyword]);

  const handleToggleScrap = useCallback(async (postId, next) => {
    try {
      if (next) await addPostScrap(postId);
      else await cancelPostScrap(postId);

      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, scraped: next } : p))
      );

      setStoryPosts((prev) => {
        if (next) {
          const exists = prev.some((p) => p.id === postId);
          if (exists) {
            return sortCompanionStoryPosts(
              prev.map((p) => (p.id === postId ? { ...p, scraped: true } : p))
            );
          }
          let added;
          setPosts((cur) => {
            const target = cur.find((p) => p.id === postId);
            added = target ? [...prev, { ...target, scraped: true }] : prev;
            return cur;
          });
          return sortCompanionStoryPosts(added);
        } else {
          return sortCompanionStoryPosts(prev.filter((p) => p.id !== postId));
        }
      });
    } catch (e) {
      showToast("스크랩 오류! 다시 시도해주세요.");
    }
  }, []);

  const handleChangeState = useCallback(async (postId, newStatus) => {
    await changePostState(postId, newStatus);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: newStatus } : p))
    );
  }, []);

  const handleDeletePost = useCallback(async (postId) => {
    await deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const handleBlockPost = useCallback(async (postId) => {
    await addPostBlock(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {/* search */}
        <View style={{ paddingHorizontal: 20 }}>
          <Shadow
            distance={2}
            startColor="rgba(0, 0, 0, 0.1)"
            finalColor="rgba(0, 0, 0, 0)"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <View style={styles.searchContainer}>
              <Search width={12} height={12} style={{ marginRight: 4 }} />
              <TextInput
                placeholder="키워드로 동행찾기"
                style={styles.searchInput}
                value={keyword}
                onChangeText={(t) => {
                  setKeyword(t);
                  if (mode === "SEARCH" && t.trim().length === 0) {
                    setFilter1State("최신순");
                    setFilter2State("전체 조건");
                    setPostLoadCondition((prev) => ({
                      ...prev,
                      page: 0,
                      sortType: "LATEST",
                      statusFilter: "ALL",
                    }));
                    setMode("LIST");
                  }
                }}
                returnKeyType="search"
                onSubmitEditing={runSearch}
              />
            </View>
          </Shadow>
        </View>
        {/* story */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={styles.circle}>
              <Scrap width={16} height={21} />
            </View>
            <Text style={styles.storyText}>스크랩한 글</Text>
          </View>
          <View style={styles.line} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingRight: 10 }}
          >
            {storyPosts.map((post) => (
              <Story key={post.id} item={post} />
            ))}
          </ScrollView>
        </View>
      </View>
      {/* filter */}
      <View style={styles.filterContainer}>
        <View style={theme.rowContainer}>
          {/* filter1 */}
          <TouchableOpacity
            ref={filter1ButtonRef}
            disabled={mode === "SEARCH"}
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
            disabled={mode === "SEARCH"}
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
        </View>
        {/* filter reset */}
        {filter1State === "전체" && filter2State === "전체 조건" ? (
          <Image
            source={require("../../assets/images/companion/filter_reset.png")}
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
              source={require("../../assets/images/companion/filter_reset_on.png")}
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
          selectedFilter === "filter1" ? setFilter1State : setFilter2State
        }
      />
      {/* content */}
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onToggleScrap={handleToggleScrap}
            onChangeState={handleChangeState}
            onDeletePost={handleDeletePost}
            onBlockPost={handleBlockPost}
          />
        )}
      />
      {/* write button */}
      <WriteButton onClick={() => navigation.navigate("CompanionForm")} />
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
});
