import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import CameraScreen from "../../components/Camera";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Context } from "../../contants/context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_DARK_BLUE } from "../../config/css/color";
import CameraScreen from "../../components/Camera";

// import PropTypes from "prop-types";
const title = "書類アップロード";

const UploadDocuments = () => {
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [listOfImages, setListOfImages] = useState([]);
  const { width: screenWidth } = useContext(Context);
  const navigation = useNavigation();

  const imageWidth = screenWidth - 20;
  const setImageHeight = (imgWidth, imgHeight) => {
    return (imgHeight / imgWidth) * imageWidth;
  };

  const openCamera = () => {
    setIsOpenCamera(true);
  };
  const closeCamera = () => {
    setIsOpenCamera(false);
  };
  const styleAnimated = useAnimatedStyle(() => {
    return {
      display: isOpenCamera ? "flex" : "none",
      // transform: [
      //   {
      //     translateY: withTiming(-500, {
      //       duration: 300,
      //     }),
      //   },
      // ],
    };
  }, [isOpenCamera]);

  const handleTakeCamera = (image) => {
    setListOfImages((prev) => [...prev, image]);
  };
  const styles = StyleSheet.create({
    scroll: {
      marginTop: 5,
      marginBottom: 60,
    },
    imageBlock: {
      paddingLeft: 10,
      marginVertical: 5,
    },
    header: {
      height: 60,
      backgroundColor: PRIMARY_DARK_BLUE,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    left: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    title: {
      color: "#fff",
      marginLeft: 10,
      fontSize: 18,
    },
    camera: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 10,
      top: 0,
      left: 0,
    },
  });

  return (
    <SafeAreaView style={{ position: "relative", flex: 1 }}>
      <Animated.View
        // className="absolute w-full h-full top-0 left-0 z-10"
        style={[styles.camera, styleAnimated]}
      >
        <CameraScreen
          onClose={closeCamera}
          handleTakeCamera={handleTakeCamera}
        />
      </Animated.View>
      <View
      // className="h-full absolute top-0 left-0 w-full z-0"
      >
        {/* <GoBackHeader title={title}> */}
        <View
          style={styles.header}
          // className="flex flex-row w-full h-[60px] justify-between px-3 bg-blue-dark"
        >
          <View
            style={styles.left}

            //  className="flex flex-row h-[60px] items-center"
          >
            <TouchableOpacity
              // className="flex w-[40px]"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <View className="flex flex-row h-full items-center">
              <TouchableOpacity
                className="rounded-full items-center justify-center"
                style={{ padding: 10 }}
                onPress={() => openCamera()}
              >
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full items-center justify-center "
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons
                  name="folder-multiple-outline"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </GoBackHeader> */}
        {/* <View> */}
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {listOfImages.map(({ base64, width, height }, index) => {
            return (
              <View key={index} style={styles.imageBlock}>
                <Image
                  style={{
                    width: imageWidth,
                    height: setImageHeight(width, height),
                    alignSelf: "stretch",
                    flex: 1,
                  }}
                  source={{ uri: "data:image/jpg;base64," + base64 }}
                />
              </View>
            );
          })}
        </ScrollView>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};
// UploadDocuments.propTypes = {
//   navigation: PropTypes.objectOf(Object),
// };

export default UploadDocuments;
