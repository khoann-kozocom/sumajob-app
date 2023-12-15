import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IconTextBlock = ({ icon, text }) => {
  return (
    <View style={styles.iconTextBlock}>
      {icon}
      <Text style={styles.textBlock}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconTextBlock: {
    marginTop: 4,
    gap: 8,
    flexShrink: 1,
    flexDirection: "row",
  },
  textBlock: {
    flexShrink: 1,
  },
});

IconTextBlock.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
};

export default IconTextBlock;
