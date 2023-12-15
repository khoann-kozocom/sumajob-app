import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";

export const FormInput = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelBlock}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <View style={styles.inputBlock}>
        <TextInput {...props} style={styles.input} />
      </View>
    </View>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelBlock: {},
  label: {
    fontWeight: "700",
  },
  inputBlock: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
