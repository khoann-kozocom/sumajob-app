import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import GoBackHeader from "../../components/Layout/GoBackHeader";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PRIMARY_GRAY, PRIMARY_LIGHT_BLUE } from "../../config/css/color";
import MynoStart from "./MynoStart";
import MynoInput from "./MynoInput";
import UploadMynoImage from "./UploadMynoImage";
import CameraScreen from "../../components/Camera";

const { width } = Dimensions.get("window");

const title = "マイナンバー提出";
const Myno = () => {
  const flatListRef = useRef(null);

  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const openCam = () => {
    setIsOpenCamera(true);
  };

  const [swiperIndex, setSwiperIndex] = useState(2);
  const [params, setParams] = React.useState({
    staff_id: null,
    myno: "",
    photo_type_myno: [],
    photo_type_identification: [],
  });
  // const {
  //   photo_type_myno: photoTypeMyno,
  //   photo_type_identification: photoTypeIdentification,
  // } = params;
  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setSwiperIndex(index);
  };
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "red" },
    swipper: { flex: 1, backgroundColor: "white" },

    child: { width, paddingHorizontal: 10 },
    controllers: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    button: {
      width: "100%",
      paddingVertical: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    btn: {
      width: "50%",
    },
    nextBtn: {
      justifyContent: "flex-end",
      backgroundColor: PRIMARY_LIGHT_BLUE,
    },
    prevBtn: {
      backgroundColor: PRIMARY_GRAY,
    },
    prevText: {
      fontSize: 18,
      marginLeft: 10,
      color: "white",
    },
    nextText: {
      color: "white",
      fontSize: 18,
      marginRight: 10,
    },
  });
  const prevBtnStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(swiperIndex === 0 ? 0 : 1),
    };
  }, [swiperIndex]);
  const nextBtnStyle = useAnimatedStyle(() => {
    return {
      justifyContent: "flex-end",
    };
  });
  const handleTakeCamera = () => {};
  const onChangeMyno = (text) => {
    setParams((prev) => ({ ...prev, myno: text }));
  };
  const swiperData = useMemo(() => {
    return [
      { component: <MynoStart />, bg: "red" },
      {
        component: (
          <MynoInput value={params.myno} onChangeMyno={onChangeMyno} />
        ),
        bg: "white",
      },
      { component: <UploadMynoImage openCam={openCam} />, bg: "blue" },
      { component: <MynoStart />, bg: "#ccc" },
    ];
  }, [params]);

  const handleNext = () => {
    if (swiperIndex < 3) {
      scrollToIndex(swiperIndex + 1);
    }
  };
  const handlePrev = () => {
    if (swiperIndex > 0) {
      scrollToIndex(swiperIndex - 1);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <GoBackHeader title={title} />
      {isOpenCamera && (
        <CameraScreen
          isOpen={isOpenCamera}
          onClose={() => setIsOpenCamera(false)}
          handleTakeCamera={handleTakeCamera}
        />
      )}
      <View style={styles.container}>
        <View style={styles.swipper}>
          <SwiperFlatList
            ref={flatListRef}
            disableGesture
            index={swiperIndex}
            data={swiperData}
            renderItem={({ item }) => (
              <View style={[styles.child, { backgroundColor: "white" }]}>
                {item.component}
              </View>
            )}
          />
        </View>
        <View style={styles.controllers}>
          <Animated.View style={[styles.btn, prevBtnStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.prevBtn]}
              onPress={handlePrev}
            >
              <AntDesign name="doubleleft" size={24} color="white" />
              <Text style={styles.prevText}>Previous</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.btn, nextBtnStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.nextBtn]}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>Next</Text>
              <AntDesign name="doubleright" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};
Myno.propTypes = {
  detailData: PropTypes.objectOf(Object),
  title: PropTypes.string,
};

export default Myno;
