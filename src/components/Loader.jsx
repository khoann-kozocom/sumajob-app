import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import LoaderSpinner from "./LoaderSpinner";

const Loading = ({ loading }) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(loading ? 1 : 0, { duration: 500 }),
      zIndex: withTiming(loading ? 10 : -1, { duration: 500 }),
    };
  });
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.35)",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      left: 0,
      zIndex: 1000,
    },
  });
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <LoaderSpinner />
    </Animated.View>
  );
};
Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
