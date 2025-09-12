import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREEN_HEIGHT, theme } from "../../colors/color";
import ScrollPicker from "react-native-wheel-scrollview-picker";

export const MyPageModal = ({ visible, onClose, buttonPosition }) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View
          style={[
            styles.modalContainer,
            { top: buttonPosition.top - 20, left: buttonPosition.left - 70 },
          ]}
        >
          {["고객센터", "로그아웃", "회원탈퇴"].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log("클릭");
                onClose();
              }}
              style={[
                index < 2 && {
                  marginBottom: 10,
                },
              ]}
            >
              <Text style={[styles.text, index === 2 && { color: "#F00" }]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export const DateModal = ({
  visible,
  onClose,
  buttonPosition,
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
  currentSelected,
}) => {
  const currentDate = new Date();
  const years = Array.from(
    { length: currentDate.getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );
  const months = Array.from({ length: 12 }, (_, i) => 1 + i);
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const days = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => 1 + i
  );

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        {/* 시계 */}
        <View
          style={[
            styles.timePickerContainer,
            {
              width: buttonPosition.width,
              top: buttonPosition.top - 20,
              left: buttonPosition.left,
            },
          ]}
        >
          <ScrollPicker
            dataSource={
              currentSelected === "year"
                ? years
                : currentSelected === "month"
                ? months
                : days
            }
            selectedIndex={
              currentSelected === "year"
                ? years.indexOf(year)
                : currentSelected === "month"
                ? months.indexOf(month)
                : days.indexOf(day)
            }
            wrapperHeight={140}
            wrapperBackground={"transparent"}
            itemHeight={34}
            highlightBorderWidth={1}
            activeItemTextStyle={styles.pickerActiveText}
            itemTextStyle={styles.pickerDefaultText}
            onValueChange={(data) => {
              currentSelected === "year"
                ? setYear(data)
                : currentSelected === "month"
                ? setMonth(data)
                : setDay(data);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 74,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#00000020",
    position: "absolute",
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: theme.main_black,
  },
  timePickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    backgroundColor: "#FFF",
    borderRadius: 5,
    // iOS
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    // shadowRadius: 5,
    // Android
    elevation: 2,
  },
  pickerActiveText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 17,
    color: theme.main_black,
  },
  pickerDefaultText: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "Pretendard-Medium",
    color: theme.grey400,
  },
});
