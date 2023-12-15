import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const LoaderSpinner = () => {
  const progress = useSharedValue(0.35);
  const progress2 = useSharedValue(0.35);
  const progress3 = useSharedValue(0.35);

  useEffect(() => {
    progress.value = withRepeat(withSpring(1, { duration: 1000 }), -1);
    progress2.value = withDelay(
      200,
      withRepeat(withSpring(1, { duration: 1000 }), -1)
    );
    progress3.value = withDelay(
      400,
      withRepeat(withSpring(1, { duration: 1000 }), -1)
    );
  }, []);
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    loader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    dot: {
      width: 20,
      height: 20,
      backgroundColor: "#6cbddd",
      marginHorizontal: 3,
      borderRadius: 20,
    },
  });
  const loaderStyle = useAnimatedStyle(() => {
    return {};
  });
  const dot1Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress.value }],
      opacity: progress.value,
    };
  });
  const dot2Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress2.value }],
      opacity: progress2.value,
    };
  });
  const dot3Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress3.value }],
      opacity: progress3.value,
    };
  });
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.loader, loaderStyle]}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </Animated.View>
      </View>
    </View>
  );
};

export default LoaderSpinner;
