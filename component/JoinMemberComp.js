import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { theme, SCREEN_WIDTH } from "../colors/color";
import { useNavigation } from "@react-navigation/native";

export function TopLayout({ title, subtext, imageSource }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtext}>{subtext}</Text>
      <Image source={imageSource} style={styles.image} />
    </>
  );
}

export function JoinMemberBtn({
  nextCondition,
  nextFunction,
  backText,
  backFunction,
}) {
  const navigation = useNavigation();
  const handleBack = backFunction || (() => navigation.goBack());

  return (
    <View
      style={{
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: "#EDEDED",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={!nextCondition}
        onPress={nextFunction}
        style={[
          styles.button,
          !nextCondition && { backgroundColor: "#F3F3F3" },
        ]}
      >
        <Text
          style={[
            { color: "#fff", fontFamily: "Pretendard-Bold", fontSize: 20 },
            !nextCondition && {
              color: "#B8B8B8",
              fontFamily: "Pretendard-SemiBold",
            },
          ]}
        >
          다음
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack}>
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            color: theme.main_blue,
            fontSize: 16,
          }}
        >
          {backText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const JoinMemberStyle = {
  textInputStyle: {
    height: 45,
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: theme.main_black,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 9,
  },
  subContainer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingTop: SCREEN_WIDTH / 10,
  },
  subText_black: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: theme.main_black,
  },
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 28,
    color: theme.main_black,
  },
  subtext: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#919191",
    marginTop: 8,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 28,
  },
  button: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.main_blue,
    borderRadius: 9,
    marginBottom: 30,
  },
});
