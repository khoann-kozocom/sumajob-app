import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export function ErrorMessage({ message }) {
  return (
    <View style={styles.fill}>
      <Text>{message}</Text>
    </View>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
