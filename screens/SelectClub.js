import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import BottomBtn from "../component/BottomBtn";

export default function SelectClub({ navigation, route }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          <Text style={styles.highlightedText}>{"응원하는 구단"}</Text>
          {"이 어디인지\n알려주세요"}
        </Text>
        <Text style={styles.noTeamText}>
          {"해당 구단의 경기에 맞춰 장소를 추천해드릴게요"}
        </Text>

        <View style={styles.row}>
          <TeamCard
            teamName="KIA"
            imageSource={require("../assets/images/clubs/kia.png")}
            isSelected={selectedTeam === "KIA"}
            onPress={() => setSelectedTeam("KIA")}
          />
          <TeamCard
            teamName="삼성"
            imageSource={require("../assets/images/clubs/samsung.jpg")}
            isSelected={selectedTeam === "삼성"}
            onPress={() => setSelectedTeam("삼성")}
          />
          <TeamCard
            teamName="LG"
            imageSource={require("../assets/images/clubs/lg.png")}
            isSelected={selectedTeam === "LG"}
            onPress={() => setSelectedTeam("LG")}
          />
        </View>

        <View style={styles.row}>
          <TeamCard
            teamName="두산"
            imageSource={require("../assets/images/clubs/doosan.png")}
            isSelected={selectedTeam === "두산"}
            onPress={() => setSelectedTeam("두산")}
          />
          <TeamCard
            teamName="KT"
            imageSource={require("../assets/images/clubs/kt.png")}
            isSelected={selectedTeam === "KT"}
            onPress={() => setSelectedTeam("KT")}
          />
          <TeamCard
            teamName="SSG"
            imageSource={require("../assets/images/clubs/ssg.png")}
            isSelected={selectedTeam === "SSG"}
            onPress={() => setSelectedTeam("SSG")}
          />
        </View>

        <View style={styles.row}>
          <TeamCard
            teamName="롯데"
            imageSource={require("../assets/images/clubs/lotte.png")}
            isSelected={selectedTeam === "롯데"}
            onPress={() => setSelectedTeam("롯데")}
          />
          <TeamCard
            teamName="한화"
            imageSource={require("../assets/images/clubs/hanwha.png")}
            isSelected={selectedTeam === "한화"}
            onPress={() => setSelectedTeam("한화")}
          />
          <TeamCard
            teamName="키움"
            imageSource={require("../assets/images/clubs/kiwoom.png")}
            isSelected={selectedTeam === "키움"}
            onPress={() => setSelectedTeam("키움")}
          />
        </View>

        <View style={styles.singleRow}>
          <TeamCard
            teamName="NC"
            imageSource={require("../assets/images/clubs/nc.png")}
            isSelected={selectedTeam === "NC"}
            onPress={() => setSelectedTeam("NC")}
          />
        </View>
      </ScrollView>
      {/* 버튼 */}
      <BottomBtn
        text="다음"
        onPress={() => {
          if (route.params.from === "mypage") {
            navigation.goBack();
          } else if (route.params.from === "myTravelInning") {
            route.params.setRivalClub(selectedTeam);
            navigation.goBack();
          } else {
            console.log("다음");
          }
        }}
        isDisabled={!selectedTeam}
      />
    </SafeAreaView>
  );
}

function TeamCard({ teamName, imageSource, isSelected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.teamCard, isSelected && styles.teamCardSelected]}
    >
      <Image
        source={imageSource}
        resizeMode={"contain"}
        style={styles.teamImage}
      />
      <Text style={[styles.teamText, isSelected && styles.teamTextSelected]}>
        {teamName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: 80,
    paddingBottom: 90,
  },
  title: {
    color: "#000000",
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    marginBottom: 8,
    textAlign: "left",
    marginHorizontal: 20,
  },
  highlightedText: {
    color: "#0084FF",
  },
  noTeamText: {
    color: "#545454",
    fontSize: 13,
    fontFamily: "Pretendard-Medium",
    marginBottom: 30,
    textAlign: "left",
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
    marginHorizontal: 20,
  },
  singleRow: {
    width: 102,
    height: 102,
    marginBottom: 52,
    marginHorizontal: 20,
  },
  teamCard: {
    width: 102,
    height: 102,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingTop: 21,
    paddingBottom: 15,
    shadowColor: "#00000070",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  teamCardSelected: {
    borderColor: "#0084FF",
    borderWidth: 2,
  },
  teamImage: {
    height: 46,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  teamText: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },
  teamTextSelected: {
    color: "#0084FF",
    fontWeight: "bold",
  },
  // nextButton: {
  //   alignItems: "center",
  //   backgroundColor: "#F2F2F2",
  //   borderRadius: 9,
  //   paddingVertical: 19,
  //   marginHorizontal: 22,
  //   shadowColor: "#00000040",
  //   shadowOpacity: 0.3,
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowRadius: 2,
  //   elevation: 2,
  // },
  // nextButtonActive: {
  //   backgroundColor: "#0084FF",
  // },
  // nextButtonText: {
  //   color: "#B8B8B8",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // nextButtonTextActive: {
  //   color: "#FFFFFF",
  // },
});
