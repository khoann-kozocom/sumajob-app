import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_LIGHT_BLUE } from "../../../config/css/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import ListDetail from "./ListDetail";

const SelectAdvanceSearch = ({ handleOnRightComponent, ...props }) => {
  const { title } = props;
  const styles = StyleSheet.create({
    form: {
      paddingVertical: 5,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 18,
    },
    selectBtn: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    selectBtnText: {
      color: PRIMARY_LIGHT_BLUE,
      marginRight: 5,
    },
  });

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => handleOnRightComponent(<ListDetail {...props} />)}
      >
        <Text style={styles.selectBtnText}>選択する</Text>
        <FontAwesome name="angle-right" size={20} color={PRIMARY_LIGHT_BLUE} />
      </TouchableOpacity>
    </View>
  );
};
SelectAdvanceSearch.propTypes = {
  handleOnRightComponent: PropTypes.func,
  title: PropTypes.string,
};

export default SelectAdvanceSearch;
