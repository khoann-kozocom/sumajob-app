import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ResetIcon from "../../../components/Icons/ResetIcon";
import { PRIMARY_GRAY } from "../../../config/css/color";
import PropTypes from "prop-types";

const ResetButton = ({ color = "#777777", fontSize = 18, ...props }) => {
  const styles = StyleSheet.create({
    all: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    text: { color, fontSize },
  });
  return (
    <TouchableOpacity {...props}>
      <View style={styles.all}>
        <ResetIcon color={color} size={fontSize} />
        <Text style={styles.text}>リセット</Text>
      </View>
    </TouchableOpacity>
  );
};

ResetButton.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
};

export default ResetButton;
