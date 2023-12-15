import React, { useState } from "react";
import { FormInput } from "./FormInput";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import moment from "moment";
import { DATE_FORMAT } from "../../config";
import PropTypes from "prop-types";
import DatePicker from "react-native-modern-datepicker";

export const FormDatePicker = ({ value, onChange, ...props }) => {
  const DATEPICKER_FORMAT = "YYYY/MM/DD";
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment(value).format(DATE_FORMAT)
  );

  const toggleHideDatePicker = () => setShowDatePicker(false);
  const toggleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleChange = (selectedDate) => {
    const formatSelectedDate = moment(selectedDate, DATEPICKER_FORMAT).format(
      DATE_FORMAT
    );
    setSelectedDate(selectedDate);
    onChange(formatSelectedDate);
    toggleHideDatePicker();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Pressable onPress={toggleShowDatePicker}>
          <FormInput
            value={moment(value).format(DATE_FORMAT)}
            editable={false}
          />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={toggleHideDatePicker}
      >
        <TouchableWithoutFeedback onPress={toggleHideDatePicker}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <DatePicker
            mode="calendar"
            current={selectedDate}
            selected={selectedDate}
            onDateChange={handleChange}
            style={{ borderRadius: 10 }}
            configs={{
              dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
              monthNames: [
                "01月",
                "02月",
                "03月",
                "04月",
                "05月",
                "06月",
                "07月",
                "08月",
                "09月",
                "10月",
                "11月",
                "12月",
              ],
            }}
            {...props}
          />
        </View>
      </Modal>
    </>
  );
};

FormDatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
