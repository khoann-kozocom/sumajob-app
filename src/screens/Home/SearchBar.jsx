import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import SearchIcon from "../../components/Icons/SearchIcon";
import MapIcon from "../../components/Icons/MapIcon";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import PropTypes from "prop-types";
import { shadowStyle } from "../../config/css/shadow";

const SearchBar = ({ openFilterArea }) => {
  const styles = StyleSheet.create({
    all: {
      backgroundColor: "#fff",
      flexDirection: "row",
      paddingVertical: 10,
      // ...shadowStyle,
    },
    buttonWp: {
      width: "50%",
    },
    button: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
    },
    leftBtn: {
      borderRightWidth: 1,
      borderColor: "#ccc",
    },
    text: {
      color: "#777",
    },
  });
  return (
    <Animated.View style={styles.all}>
      <View style={styles.buttonWp}>
        <TouchableOpacity
          style={[styles.button, styles.leftBtn]}
          onPress={() => openFilterArea()}
        >
          <SearchIcon color="#777" />
          <Text style={styles.text}>検索</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWp}>
        <TouchableOpacity style={styles.button}>
          <MapIcon color={PRIMARY_LIGHT_BLUE} />
          <Text style={styles.text}>MAPで見る</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
SearchBar.propTypes = {
  openFilterArea: PropTypes.func,
};

export default SearchBar;
