import { RefreshControl, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import Job from "../../components/common/Job";
import LoadMoreSpinner from "../../components/LoadMoreSpinner";
import AnimatedFlatlist from "../../components/Animated/AnimatedFlatlist";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const Jobs = ({
  onRefresh,
  isRefresh = false,
  stopFetchMore,
  onPress,
  data,
  ...props
}) => {
  const scrollRef = useAnimatedRef();

  return (
    <Animated.View>
      {!data?.length ? (
        <Text style={{ padding: 10 }}>検索結果は見つかりませんでした。</Text>
      ) : (
        <AnimatedFlatlist
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <Job job={item} onPress={() => onPress(item)} />
          )}
          ListFooterComponent={() => !stopFetchMore && <LoadMoreSpinner />}
          onEndReachedThreshold={0.08}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          keyExtractor={(item, index) => index}
          data={data}
          {...props}
        />
      )}
    </Animated.View>
  );
};

Jobs.propTypes = {
  onPress: PropTypes.func,
  onRefresh: PropTypes.func,
  isRefresh: PropTypes.bool,
  stopFetchMore: PropTypes.bool,
  ListHeaderComponent: PropTypes.element,
  data: PropTypes.arrayOf(Object),
  style: PropTypes.objectOf(Object),
  flatListRef: PropTypes.objectOf(Object),
};

export default Jobs;
