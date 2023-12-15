/* eslint-disable no-irregular-whitespace */
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import PropTypes from "prop-types";
import GoBackHeader from "../Layout/GoBackHeader";

const NotificationDetail = ({ detailData = {}, title }) => {
  const { data } = detailData;
  return (
    <SafeAreaView className="h-full">
      <GoBackHeader title={title} />
      <View className="p-3">
        <Text className="font-bold text-[20px] mb-2 ml-2">{data?.title}</Text>
        <Text>{data?.body}</Text>
      </View>
      <View className="absolute bg-white pt-2 pb-2 left-0 bottom-0 w-full shadow shadow-[4px]">
        <Text className="w-full text-right text-4 mb-2 pr-2">
          スマジョブ　スタッフ管理事務局
        </Text>
        <Text className="w-full text-right text-4 mb-2 pr-2">
          {data?.created_at}
        </Text>
      </View>
    </SafeAreaView>
  );
};
NotificationDetail.propTypes = {
  detailData: PropTypes.objectOf(Object),
  title: PropTypes.string,
};

export default NotificationDetail;
