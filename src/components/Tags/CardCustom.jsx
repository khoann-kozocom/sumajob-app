import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const CardCustom = ({ children, style, ...props }) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderRadius: 8,
      shadowOffset: {
        width: 10,
        height: -10,
      },
    },
  });
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
CardCustom.propTypes = {
  style: PropTypes.objectOf(Object),
  children: PropTypes.element,
};

export default CardCustom;
