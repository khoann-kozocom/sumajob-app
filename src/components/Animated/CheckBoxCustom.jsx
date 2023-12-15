import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import Entypo from "react-native-vector-icons/Entypo";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CheckBoxCustom = ({
  size = 30,
  checked = false,
  onChange = () => {},
}) => {
  const opacity = useSharedValue(0);
  const [isCheck, setIsCheck] = useState(checked);
  const toggle = () => {
    opacity.value = withTiming(isCheck ? 0 : 1, { duration: 50 });
    setIsCheck(!isCheck);
    onChange();
  };
  useEffect(() => {
    opacity.value = withTiming(checked ? 1 : 0, { duration: 100 });
    setIsCheck(checked);
  }, [checked]);
  const styles = StyleSheet.create({
    container: {
      width: size + 10,
      height: size + 10,
      borderRadius: 4,
      justifyContent: "center",
    },
    iconBlock: {
      width: size,
      height: size,
      borderWidth: size * 0.06,
      borderColor: "green",
      borderRadius: size * 0.06,
      position: "relative",
    },

    icon: {
      position: "absolute",
      top: -size * 0.06,
      left: -size * 0.02,
    },
  });
  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value]);
  return (
    <TouchableOpacity style={styles.container} onPress={toggle}>
      <View style={styles.iconBlock}>
        <Animated.View style={iconStyle}>
          <Entypo style={styles.icon} name="check" size={size} color="green" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
CheckBoxCustom.propTypes = {
  checked: PropTypes.bool,
  size: PropTypes.number,
  onChange: PropTypes.func,
};

export default CheckBoxCustom;
