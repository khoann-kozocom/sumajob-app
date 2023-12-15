import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PRIMARY_DARK_BLUE, PRIMARY_ORANGE } from "../../config/css/color";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Context } from "../../contants/context";
import PropTypes from "prop-types";
import { HEADER_HEIGHT } from "../../contants/common";
import { FormButton } from "../Form";

const Header = ({ navigation }) => {
  const {
    staffDetail,
    headerOpacity,
    headerHeight,
    headerTranslateY,
    accessToken,
  } = useContext(Context);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: headerTranslateY.value,
        },
      ],
    };
  });
  const style = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: PRIMARY_DARK_BLUE,
      alignItems: "center",
    },
    header: {
      paddingHorizontal: 5,
      height: HEADER_HEIGHT,
    },
    title: { color: "#fff", fontSize: 12 },
    logoBlock: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 50,
      height: 50,
    },
    logoText: {
      width: 120,
      height: 50,
    },
    account: {
      color: "#fff",
      textAlign: "right",
    },
    rightHeader: {
      paddingRight: 15,
      paddingTop: 10,
    },
  });
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={PRIMARY_DARK_BLUE} />
      <Animated.View style={[style.container, animatedStyles]}>
        <Animated.View style={style.header}>
          <Text style={style.title}>バイトするなら【エントリー】</Text>
          <View style={style.logoBlock}>
            <Image
              source={require("../../assets/logo-entry.png")}
              style={style.logo}
            />
            <Image
              source={require("../../assets/logo-text.png")}
              style={style.logoText}
            />
          </View>
        </Animated.View>
        <Animated.View style={style.rightHeader}>
          {accessToken ? (
            <View>
              <Text style={style.account}>{staffDetail?.data?.casnavi_id}</Text>
              <Text style={style.account}>{staffDetail?.data?.staff_name}</Text>
            </View>
          ) : (
            <View>
              <FormButton
                title="ログイン"
                color={PRIMARY_ORANGE}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

Header.propTypes = {
  navigation: PropTypes.objectOf(Object),
};

export default Header;
