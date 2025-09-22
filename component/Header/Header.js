import { TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../colors/color";
import Left from "../../assets/icon/left_arrow.svg";
import { useNavigation } from "@react-navigation/native";

/**
 * 공통 헤더 컴포넌트
 *
 * - 왼쪽에는 항상 뒤로가기 버튼이 표시됩니다.
 * - 가운데에는 `title` 텍스트가 표시됩니다.
 * - 오른쪽에는 `children`이 존재하면 표시됩니다.
 *
 * @param {Object} props - Header 컴포넌트 props
 * @param {string} [props.title=""] - 헤더 가운데 표시할 제목
 * @param {React.ReactNode} [props.children] - 오른쪽에 표시할 커스텀 요소
 * @returns {JSX.Element} 헤더 UI
 */
export const Header = ({ title = "", children }) => {
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
      <View style={{ minWidth: 40, alignItems: "flex-end" }}>{children}</View>
    </View>
  );
};
