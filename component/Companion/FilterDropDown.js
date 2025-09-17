import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { theme } from "../../colors/color";
import Check from "../../assets/icon/companion/filter_check.svg";
import Progress from "../../assets/icon/companion/filter_progress.svg";

export const FilterDropDown = ({
  visible,
  onClose,
  buttonPosition,
  selectedFilter,
  setFilterState,
}) => {
  const FILTER_OPTIONS = {
    filter1: ["최신순", "스크랩"],
    filter2: ["구했어요", "구하는중"],
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
                onClose();
              }}
              style={[
                index < FILTER_OPTIONS[selectedFilter].length - 1 && {
                  marginBottom: 14,
                },
                selectedFilter === "filter2" && {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              {selectedFilter === "filter2" ? (
                index === 0 ? (
                  <Check style={{ marginRight: 4 }} />
                ) : (
                  <Progress style={{ marginRight: 4 }} />
                )
              ) : (
                <></>
              )}
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "transparent",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#545454",
  },
});
