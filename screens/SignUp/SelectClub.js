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
import BottomBtn from "../../component/BottomBtn";
import { showToast } from "../../component/Toast";
import { enrollClub } from "../../api/club/club";

export default function SelectClub({ navigation, route }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamId, setTeamId] = useState(null);

  const handleClub = async () => {
    if (route.params && route.params.from === "myTravelInning") {
      route.params.setRivalClub(selectedTeam);
      navigation.goBack();
    } else {
      const isSucccess = await enrollClub(teamId);
      if (route.params && route.params.from === "mypage") {
        if (isSucccess) {
          showToast("저장 완료!");
        } else {
          showToast("다음에 다시 시도해주세요.");
        }
        navigation.goBack();
      } else {
        if (isSucccess) {
          navigation.navigate("SelectPhoto");
        } else {
          showToast("오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
  };

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
            imageSource={require("../../assets/images/clubs/kia.png")}
            isSelected={selectedTeam === "KIA"}
            onPress={() => {
              setSelectedTeam("KIA");
              setTeamId(9);
            }}
          />
          <TeamCard
            teamName="삼성"
            imageSource={require("../../assets/images/clubs/samsung.jpg")}
            isSelected={selectedTeam === "삼성"}
            onPress={() => {
              setSelectedTeam("삼성");
              setTeamId(7);
            }}
          />
          <TeamCard
            teamName="LG"
            imageSource={require("../../assets/images/clubs/lg.png")}
            isSelected={selectedTeam === "LG"}
            onPress={() => {
              setSelectedTeam("LG");
              setTeamId(2);
            }}
          />
        </View>

        <View style={styles.row}>
          <TeamCard
            teamName="두산"
            imageSource={require("../../assets/images/clubs/doosan.png")}
            isSelected={selectedTeam === "두산"}
            onPress={() => {
              setSelectedTeam("두산");
              setTeamId(1);
            }}
          />
          <TeamCard
            teamName="KT"
            imageSource={require("../../assets/images/clubs/kt.png")}
            isSelected={selectedTeam === "KT"}
            onPress={() => {
              setSelectedTeam("KT");
              setTeamId(6);
            }}
          />
          <TeamCard
            teamName="SSG"
            imageSource={require("../../assets/images/clubs/ssg.png")}
            isSelected={selectedTeam === "SSG"}
            onPress={() => {
              setSelectedTeam("SSG");
              setTeamId(3);
            }}
          />
        </View>

        <View style={styles.row}>
          <TeamCard
            teamName="롯데"
            imageSource={require("../../assets/images/clubs/lotte.png")}
            isSelected={selectedTeam === "롯데"}
            onPress={() => {
              setSelectedTeam("롯데");
              setTeamId(8);
            }}
          />
          <TeamCard
            teamName="한화"
            imageSource={require("../../assets/images/clubs/hanwha.png")}
            isSelected={selectedTeam === "한화"}
            onPress={() => {
              setSelectedTeam("한화");
              setTeamId(10);
            }}
          />
          <TeamCard
            teamName="키움"
            imageSource={require("../../assets/images/clubs/kiwoom.png")}
            isSelected={selectedTeam === "키움"}
            onPress={() => {
              setSelectedTeam("키움");
              setTeamId("5");
            }}
          />
        </View>

        <View style={styles.singleRow}>
          <TeamCard
            teamName="NC"
            imageSource={require("../../assets/images/clubs/nc.png")}
            isSelected={selectedTeam === "NC"}
            onPress={() => {
              setSelectedTeam("NC");
              setTeamId(4);
            }}
          />
        </View>
      </ScrollView>
      <BottomBtn text="다음" onPress={handleClub} isDisabled={!selectedTeam} />
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
});
