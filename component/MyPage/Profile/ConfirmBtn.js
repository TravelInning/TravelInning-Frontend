import { Text, TouchableOpacity } from "react-native";
import { SCREEN_HEIGHT, theme } from "../../../colors/color";
import { useNavigation } from "@react-navigation/native";

export const ConfirmBtn = ({
  text = "완료",
  confirmFunc,
  disabled = false,
}) => {
  const navigation = useNavigation();
  const onPress = confirmFunc || (() => navigation.goBack());

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text
        style={{
          alignSelf: "center",
          fontFamily: "Pretendard-SemiBold",
          fontSize: 21,
          color: theme.main_blue,
          marginBottom: SCREEN_HEIGHT / 8,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
