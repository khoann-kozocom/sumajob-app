import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "react-native-vision-camera";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import { useLoading } from "../LoadingContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Context } from "../../contants/context";

const CameraScreen = ({
  isOpen = false,
  onClose = () => {},
  handleTakeCamera = () => {},
}) => {
  const { height, width, statusBarHeight } = useContext(Context);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { showLoading, hideLoading } = useLoading();
  const translateY = useSharedValue(height);

  const cameraRef = useRef(null);

  const handleClose = () => {
    translateY.value = withTiming(height, { duration: 400 });
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    if (isOpen) {
      translateY.value = withDelay(100, withTiming(0, { duration: 400 }));
    }
  }, [isOpen]);
  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      position: "absolute",
      width,
      height: height - statusBarHeight * 2,
      top: 0,
      zIndex: 2000,
      backgroundColor: "#fff",
    };
  }, []);
  const styles = StyleSheet.create({
    camera: {
      height: width * 1.4,
    },
    header: {
      height: 100,
      backgroundColor: "#000",
      paddingTop: 20,
      paddingHorizontal: 20,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    takeCamera: {
      backgroundColor: "#000",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: 50,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 25,
    },
  });
  const handleFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    showLoading();
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync(options);
      handleTakeCamera(photo);
      hideLoading();
      onClose();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Animated.View style={wrapperStyle}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="arrowleft" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFlip}>
          <MaterialIcons name="flip-camera-android" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Camera ref={cameraRef} style={styles.camera} type={type} />
      <View style={styles.takeCamera}>
        <TouchableOpacity style={styles.button} onPress={takePicture} />
      </View>
    </Animated.View>
  );
};
CameraScreen.propTypes = {
  onClose: PropTypes.func,
  handleTakeCamera: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CameraScreen;
