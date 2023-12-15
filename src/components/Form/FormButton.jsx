import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const FormButton = ({ text, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor }}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

FormButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
