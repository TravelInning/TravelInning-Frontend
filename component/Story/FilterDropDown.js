import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../colors/color";

const FilterDropDown = ({
  visible,
  onClose,
  buttonPosition,
  selectedFilter,
  setFilterState,
}) => {
  const FILTER_OPTIONS = {
    filter1: ["최신순", "스크랩"],
    filter2: ["이야기해요", "끝난이야기"],
    filter3: ["야구", "연애", "일상", "뉴스"],
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.dropdownContainer,
            { top: buttonPosition.top - 26, left: buttonPosition.left },
          ]}
        >
          {FILTER_OPTIONS[selectedFilter]?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setFilterState(item);
                console.log("클릭");
                onClose();
              }}
              style={[
                index < FILTER_OPTIONS[selectedFilter].length - 1 && {
                  marginBottom: 14,
                },
              ]}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // filter modal(dropdown)
  dropdownContainer: {
    minHeight: 74,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.borderColor,
    position: "absolute",
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
});

export default FilterDropDown;
