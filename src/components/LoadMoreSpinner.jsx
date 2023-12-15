import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { PRIMARY_LIGHT_BLUE } from "../config/css/color";

const LoadMoreSpinner = () => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      height: 100,
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={PRIMARY_LIGHT_BLUE} />
    </View>
  );
};

export default memo(LoadMoreSpinner);
