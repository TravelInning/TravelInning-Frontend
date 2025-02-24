import { TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../colors/color";
import Left from "../../assets/icon/left_arrow.svg";
import { useNavigation } from "@react-navigation/native";

export const Header = ({ title, onRightPress = () => {}, right = "none" }) => {
  const navigation = useNavigation();

  return (
    <View style={theme.header}>
      <TouchableOpacity onPress={() => navigation.pop()} style={{ width: 40 }}>
        <Left width={8} height={15} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Pretendard-SemiBold",
          color: theme.main_black,
        }}
      >
        {title}
      </Text>
      {right === "none" ? (
        <TouchableOpacity onPress={onRightPress} style={{ width: 40 }}>
          <View style={{ width: 8 }} />
        </TouchableOpacity>
      ) : (
        right()
      )}
    </View>
  );
};
