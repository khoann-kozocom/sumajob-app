import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import PropTypes from "prop-types";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import { useAlert } from "../../contants/AlertContext";

const AlertModal = ({ alertData }) => {
  const { closeAlert } = useAlert();

  const {
    open,
    title,
    description,
    confirmButton,
    cancelButton,
    element,
    cancelFunc,
    confirmFunc,
  } = alertData;

  const opacity = useSharedValue(0);
  const zIndex = useSharedValue(-1);

  const wraperStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndex.value,
    };
  });
  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      backgroundColor: "#fff",
      width: "80%",
      borderRadius: 5,
    },
    content: {
      paddingHorizontal: 20,
      paddingVertical: 30,
      alignItems: "center",
    },
    contentTitle: {
      fontWeight: "500",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 0.5,
      borderColor: "#000",
    },
    btn: {
      width: "50%",
      paddingVertical: 10,
      alignItems: "center",
      textAlign: "center",
    },
    cancelBtn: {
      borderRightWidth: 0.5,
      borderColor: "#000",
    },
    confirmBtn: {},
    cancelBtnText: {
      fontWeight: "bold",
      color: "red",
    },
    confirmBtnText: {
      fontWeight: "bold",
      color: PRIMARY_LIGHT_BLUE,
    },
  });

  useEffect(() => {
    if (open) {
      zIndex.value = 999;
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 100 });

      setTimeout(() => {
        zIndex.value = -1;
      }, 100);
    }
  }, [open]);
  const handleConfirm = () => {
    closeAlert();
    confirmFunc();
  };
  const handleCancel = () => {
    closeAlert();
    cancelFunc();
  };
  return (
    <Animated.View style={[styles.wrapper, wraperStyles]}>
      <Animated.View style={styles.container}>
        <View>
          <View style={styles.content}>
            {element || (
              <>
                <Text style={styles.contentTitle}>{title}</Text>
                {description && (
                  <Text style={styles.contentDesc}>{description}</Text>
                )}
              </>
            )}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.cancelBtn]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelBtnText}>{cancelButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.confirmBtn]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmBtnText}>{confirmButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
AlertModal.propTypes = {
  alertData: PropTypes.objectOf(Object),
};

export default AlertModal;
