import React, { useContext } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import PropTypes from "prop-types";
import { Context } from "../../contants/context";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useBottomModal } from "../../contants/BottomModalContext";
import { PRIMARY_GRAY } from "../../config/css/color";

const BottomModal = ({ children, top, backgroundColor = "#fff", name }) => {
  const { height, width } = useContext(Context);
  const { translateY, opacity, zIndex, closeBottomModal } = useBottomModal();

  const handleOnGestureHeader = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      if (event.translationY > -50) {
        translateY.value = event.translationY;
      }
    },

    onFinish: (event) => {
      if (event.translationY > height * 0.2) {
        runOnJS(closeBottomModal)();
      } else {
        zIndex.value = 10;
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
      }
    },
  });

  // const handleOnGestureBody = useAnimatedGestureHandler({
  //   onStart: () => {},
  //   onActive: (event) => {
  //     if (event.translationY > 50 && scrollYOfBottomModal.value <= 0) {
  //       translateY.value = event.translationY;
  //     }
  //   },

  //   onFinish: (event) => {
  //     if (event.translationY > height * 0.2) {
  //       opacity.value = withTiming(0, { duration: 400 });
  //       translateY.value = withTiming(startTranslateY, {
  //         duration: 400,
  //       });
  //       runOnJS(close)();
  //     } else {
  //       zIndex.value = 10;
  //       opacity.value = withTiming(1, { duration: 400 });
  //       translateY.value = withTiming(0, { duration: 400 });
  //     }
  //   },
  // });

  const styles = StyleSheet.create({
    wrapper: {
      width: width,
      height: height,
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      flex: 1,
      backgroundColor: "rgba(0,0,0, 0.4)",
    },
    container: {
      width: width,
      height: height - 100,
      top: top || 80,
      borderRadius: 10,
      backgroundColor,
      overflow: "hidden",
    },
    controller: {
      justifyContent: "center",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 12,
      alignItems: "center",
    },
    header: {
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 0.5,
      alignItems: "center",
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
    },
  });

  const styleWrapper = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndex.value,
    };
  }, []);

  const styleContainer = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);
  const controllerLine = useAnimatedStyle(() => {
    return {
      width: 100,
      height: 8,
      borderRadius: 4,
      backgroundColor: PRIMARY_GRAY,
    };
  }, []);

  return (
    <Animated.View style={[styles.wrapper, styleWrapper]}>
      <Animated.View style={[styles.container, styleContainer]}>
        <PanGestureHandler
          onGestureEvent={handleOnGestureHeader}
          avgTouches={true}
        >
          {name ? (
            <Animated.View style={styles.header}>
              <Text style={styles.name}>{name}</Text>
              <TouchableOpacity onPress={closeBottomModal}>
                <Ionicons name="ios-close-sharp" size={28} color="black" />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={styles.controller}>
              <Animated.View style={controllerLine} />
            </Animated.View>
          )}
        </PanGestureHandler>
        {/* <PanGestureHandler
          onGestureEvent={handleOnGestureBody}
          activeOffsetX={[-5, 5]}
          activeOffsetY={[-30, 30]}
          avgTouches={true}
        > */}
        <Animated.View>{children}</Animated.View>
        {/* </PanGestureHandler> */}
      </Animated.View>
    </Animated.View>
  );
};

BottomModal.propTypes = {
  children: PropTypes.element,
  top: PropTypes.number,
  backgroundColor: PropTypes.string,
  name: PropTypes.string,
};

export default BottomModal;
