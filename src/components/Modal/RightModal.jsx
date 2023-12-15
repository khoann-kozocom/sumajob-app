import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import PropTypes from "prop-types";
import { Context } from "../../contants/context";

const RightModal = ({ children, open }) => {
  const { width } = useContext(Context);

  // const opacity = useSharedValue(0);
  const left = useSharedValue(width);

  const wraperStyles = useAnimatedStyle(() => {
    return {
      // opacity: opacity.value,
      left: left.value,
    };
  });
  const styles = StyleSheet.create({
    wrapper: {
      width,
      height: "100%",
      position: "absolute",
      top: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
      backgroundColor: "red",
    },
  });
  useEffect(() => {
    if (open) {
      left.value = withTiming(0, { duration: 300 });
    } else {
      left.value = withTiming(width, { duration: 300 });
    }
  }, [open]);

  return (
    <Animated.View style={[styles.wrapper, wraperStyles]}>
      {children}
    </Animated.View>
  );
};
RightModal.propTypes = {
  children: PropTypes.element,
  open: PropTypes.bool,
};

export default RightModal;
