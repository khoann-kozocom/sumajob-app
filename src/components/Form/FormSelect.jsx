import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider } from "react-native-paper";

export const FormSelect = (props) => {
  const { value, options = [], onChange, placeholder, disabled } = props;
  const findVal = options.find((option) => option.id === value);

  const [isShowModal, setIsShowModal] = useState(false);
  const hideModal = () => setIsShowModal(false);
  const showModal = () => setIsShowModal(true);

  const onPressItem = (item) => {
    onChange(item.id);
    hideModal();
  };

  const selectedVal = useMemo(() => {
    const findVal = options.find((option) => option.id === value);
    return findVal ? findVal.name : placeholder;
  }, [value]);

  const renderItem = (item) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.name}</Text>
          {item.id === value && (
            <AntDesign
              style={styles.icon}
              color="#091046"
              name="check"
              size={20}
            />
          )}
        </View>
        <Divider />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.touchableOpacity,
          { backgroundColor: disabled ? "#f7f7f7" : "#fff" },
        ]}
        onPress={showModal}
        disabled={disabled}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.textItem,
              { color: disabled || !findVal?.name ? "#999" : "black" },
            ]}
          >
            {selectedVal}
          </Text>
          <AntDesign
            style={styles.icon}
            color={disabled ? "#999" : "black"}
            name="caretdown"
            size={12}
          />
        </View>
      </TouchableOpacity>
      <Modal
        transparent
        animationType="fade"
        visible={isShowModal}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {options?.map((option) => renderItem(option))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

FormSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(Object),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginTop: 8,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 350,
    width: "100%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
