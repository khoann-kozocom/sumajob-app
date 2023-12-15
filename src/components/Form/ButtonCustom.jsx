import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

const ButtonCustom = ({ title, color, icon, style, ...props }) => {
  const styles = StyleSheet.create({
    all: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 8,
      ...style,
    },
    text: {
      color,
    },
  });
  return (
    <TouchableOpacity style={styles.all} {...props}>
      <View>{icon}</View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

ButtonCustom.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  style: PropTypes.objectOf(Object),
  color: PropTypes.string,
};

export default ButtonCustom;
