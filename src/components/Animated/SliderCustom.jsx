import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import { shadowStyle } from "../../config/css/shadow";
import { PanGestureHandler } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";

const POINT_WIDTH = 24;
const LINE_HEIGHT = 5;
const LABEL_WIDTH = 60;
const LABEL_POSITION = 38;

const { width } = Dimensions.get("screen");

const SliderCustom = ({
  sliderWidth,
  min,
  max,
  increment = 1,
  onChange = () => {},
  defaultValues = { min: 1, max: 100 },
}) => {
  const { min: defaultMin, max: defaultMax } = defaultValues;
  const distance = max - min;
  const paddingSlider = (width - sliderWidth) * 0.5;
  const leftPointTranslate = useSharedValue(
    ((defaultMin - min) / distance) * sliderWidth
  );
  const rightPointTranslate = useSharedValue(
    ((defaultMax - min) / distance) * sliderWidth - sliderWidth
  );
  const [values, setValues] = useState(defaultValues);
  const { min: minValue, max: maxValue } = values;
  const handleSetValue = (type, value) => {
    setValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  const handleOnChange = (type, minValue, maxValue) => {
    handleSetValue(type, type === "min" ? minValue : maxValue);
    onChange(minValue, maxValue);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      position: "relative",
      transform: [{ translateY: 45 }],
      paddingBottom: 45,
    },
    childPoint: {
      width: POINT_WIDTH - 8,
      height: POINT_WIDTH - 8,
      backgroundColor: PRIMARY_LIGHT_BLUE,
      borderRadius: (POINT_WIDTH - 8) * 0.5,
      position: "absolute",
      top: (POINT_WIDTH - 8) * 0.25,
      left: (POINT_WIDTH - 8) * 0.25,
      zIndex: 2,
    },
    label: {
      width: LABEL_WIDTH,
      height: LABEL_WIDTH * 0.45,
      position: "absolute",
      top: -LABEL_POSITION,
      backgroundColor: PRIMARY_LIGHT_BLUE,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      // ...shadowStyle,
    },
    labelText: {
      color: "#fff",
    },
    arrow: {
      position: "absolute",
      top: -(LABEL_POSITION - 10),
      left: 12,
      transform: [{ translateY: 10 }, { translateX: -8 }],
    },

    bottom: {
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
    },
    minText: {
      transform: [{ translateX: -20 }],
    },
    maxText: {
      transform: [{ translateX: 20 }],
    },
  });
  const bgLineStyle = useAnimatedStyle(() => {
    return {
      width: sliderWidth,
      height: LINE_HEIGHT,
      backgroundColor: PRIMARY_LIGHT_BLUE,
      borderRadius: 3,
      marginBottom: 15,
    };
  }, []);

  const leftLineStyle = useAnimatedStyle(() => {
    return {
      width: leftPointTranslate.value,
      height: LINE_HEIGHT,
      backgroundColor: "#96C9DD",
      position: "absolute",
      top: 0,
      left: 0,
      borderRadius: 3,
    };
  }, []);
  const rightLineStyle = useAnimatedStyle(() => {
    return {
      width: -rightPointTranslate.value,
      height: LINE_HEIGHT,
      backgroundColor: "#96C9DD",
      position: "absolute",
      top: 0,
      right: 0,
      borderRadius: 3,
    };
  }, []);
  const leftPointStyle = useAnimatedStyle(() => {
    return {
      width: POINT_WIDTH,
      height: POINT_WIDTH,
      position: "absolute",
      top: -((POINT_WIDTH - LINE_HEIGHT) * 0.5),
      left: -POINT_WIDTH * 0.5,
      backgroundColor: "#fff",
      borderRadius: POINT_WIDTH * 0.5,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      // ...shadowStyle,
      transform: [
        {
          translateX: leftPointTranslate.value,
        },
      ],
    };
  }, []);
  const rightPointStyle = useAnimatedStyle(() => {
    return {
      width: POINT_WIDTH,
      height: POINT_WIDTH,
      position: "absolute",
      top: -((POINT_WIDTH - LINE_HEIGHT) * 0.5),
      right: -POINT_WIDTH * 0.5,
      backgroundColor: "#fff",
      borderRadius: POINT_WIDTH * 0.5,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      // ...shadowStyle,
      transform: [
        {
          translateX: rightPointTranslate.value,
        },
      ],
    };
  }, []);

  const handleOnGestureLeft = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      const { absoluteX } = event;
      if (
        absoluteX >= paddingSlider &&
        ((absoluteX - paddingSlider) / sliderWidth) * distance + min <=
          maxValue - increment
      ) {
        leftPointTranslate.value = absoluteX - paddingSlider;
        let newValue =
          ((absoluteX - paddingSlider) / sliderWidth) * distance + min;
        if (newValue % increment >= increment * 0.5) {
          newValue = newValue - (newValue % increment) + increment;
        } else {
          newValue = newValue - (newValue % increment);
        }
        runOnJS(handleSetValue)("min", newValue);
      }
    },

    onFinish: (event) => {
      const { absoluteX } = event;

      let newValue =
        ((absoluteX - paddingSlider) / sliderWidth) * distance + min;
      if (newValue % increment >= increment * 0.5) {
        newValue = newValue - (newValue % increment) + increment;
      } else {
        newValue = newValue - (newValue % increment);
      }
      if (absoluteX >= paddingSlider) {
        if (
          ((absoluteX - paddingSlider) / sliderWidth) * distance + min <=
          maxValue - increment
        ) {
          leftPointTranslate.value =
            ((newValue - min) / distance) * sliderWidth;
          runOnJS(handleOnChange)("min", newValue, maxValue);
        } else {
          leftPointTranslate.value =
            ((maxValue - increment - min) / distance) * sliderWidth;
          runOnJS(handleOnChange)("min", maxValue - increment, maxValue);
        }
      } else {
        runOnJS(handleOnChange)("min", min, maxValue);
      }
    },
  });

  const handleOnGestureRight = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      const { absoluteX } = event;
      if (
        absoluteX <= width - paddingSlider &&
        ((absoluteX - paddingSlider) / sliderWidth) * distance + min >=
          minValue + increment
      ) {
        rightPointTranslate.value = -(width - paddingSlider - absoluteX);

        let newValue =
          ((absoluteX - paddingSlider) / sliderWidth) * distance + min;
        if (newValue % increment >= increment * 0.5) {
          newValue = newValue - (newValue % increment) + increment;
        } else {
          newValue = newValue - (newValue % increment);
        }
        runOnJS(handleSetValue)("max", newValue);
      }
    },

    onFinish: (event) => {
      const { absoluteX } = event;

      let newValue =
        ((absoluteX - paddingSlider) / sliderWidth) * distance + min;
      if (newValue % increment >= increment * 0.5) {
        newValue = newValue - (newValue % increment) + increment;
      } else {
        newValue = newValue - (newValue % increment);
      }

      if (absoluteX <= width - paddingSlider) {
        if (
          ((absoluteX - paddingSlider) / sliderWidth) * distance + min >=
          minValue + increment
        ) {
          rightPointTranslate.value =
            ((newValue - min) / distance) * sliderWidth - sliderWidth;
          runOnJS(handleOnChange)("max", minValue, newValue);
        } else {
          rightPointTranslate.value =
            ((minValue + increment - min) / distance) * sliderWidth -
            sliderWidth;
          runOnJS(handleOnChange)("max", minValue, minValue + increment);
        }
      } else {
        runOnJS(handleOnChange)("max", minValue, max);
      }
    },
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={bgLineStyle} />
      <Animated.View style={leftLineStyle} />
      <Animated.View style={rightLineStyle} />
      <PanGestureHandler onGestureEvent={handleOnGestureLeft}>
        <Animated.View style={leftPointStyle}>
          <View style={styles.label}>
            <Text style={styles.labelText}>{`${minValue}円`}</Text>
          </View>
          <View style={styles.arrow}>
            <AntDesign name="caretdown" size={16} color={PRIMARY_LIGHT_BLUE} />
          </View>
          <View style={styles.childPoint} />
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={handleOnGestureRight}>
        <Animated.View style={rightPointStyle}>
          <View style={styles.label}>
            <Text style={styles.labelText}>{`${maxValue}円`}</Text>
          </View>
          <View style={styles.arrow}>
            <AntDesign name="caretdown" size={16} color={PRIMARY_LIGHT_BLUE} />
          </View>
          <View style={styles.childPoint} />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.bottom}>
        <Text style={styles.minText}>{`${min}円`}</Text>
        <Text style={styles.maxText}>{`${max}円`}</Text>
      </View>
    </Animated.View>
  );
};
SliderCustom.propTypes = {
  sliderWidth: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  increment: PropTypes.number,
  onChange: PropTypes.func,
  defaultValues: PropTypes.objectOf(Object),
};

export default SliderCustom;
