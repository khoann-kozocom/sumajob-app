import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_DARK_BLUE } from "../../config/css/color";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const GoBackHeader = ({ title = "" }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={PRIMARY_DARK_BLUE} />
      <View className="flex h-[60px] justify-center pl-4 bg-blue-dark">
        <View className="flex flex-row h-[60px] items-center">
          <TouchableOpacity
            className="flex w-[40px]"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-[4]">{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

GoBackHeader.propTypes = {
  title: PropTypes.string,
};

export default GoBackHeader;
