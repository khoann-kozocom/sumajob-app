import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { Context } from "../../contants/context";
import { PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ImageBox = ({
  handleTouchCameraButton = () => {},
  handleTouchFileButton = () => {},
  style,
}) => {
  const { width } = useContext(Context);

  const styles = StyleSheet.create({
    imageBox: {
      height: width,
      width: "100%",
      borderColor: PRIMARY_LIGHT_BLUE,
      borderWidth: 1,
      borderRadius: 4,
      position: "relative",
      ...style,
    },
    addButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      transform: [{ translateY: -30 }],
      width: "100%",
      gap: 10,
    },
    camButton: {
      backgroundColor: "rgba(0, 0, 0,0.25)",
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.imageBox}>
      <View style={styles.addButtons}>
        <TouchableOpacity
          style={styles.camButton}
          onPress={handleTouchCameraButton}
        >
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.camButton}
          onPress={handleTouchFileButton}
        >
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
ImageBox.propTypes = {
  handleTouchCameraButton: PropTypes.func,
  handleTouchFileButton: PropTypes.func,
  style: PropTypes.objectOf(Object),
};

export default ImageBox;
