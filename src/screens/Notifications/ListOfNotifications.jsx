import React from "react";
import AnimatedFlatlist from "../../components/Animated/AnimatedFlatlist";
import NotificationItem from "./NotificationItem";
import LoadMoreSpinner from "../../components/LoadMoreSpinner";
import PropTypes from "prop-types";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { RefreshControl } from "react-native";

const ListOfNotifications = ({
  onRefresh,
  isRefresh = false,
  detailScreen,
  loadingMore,
  ...props
}) => {
  const scrollRef = useAnimatedRef();

  return (
    <Animated.View>
      <AnimatedFlatlist
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <NotificationItem
            id={item.id}
            title={item.title}
            body={item.body}
            createdAt={item.created_at}
            detailScreen={detailScreen}
          />
        )}
        ListFooterComponent={() => loadingMore && <LoadMoreSpinner />}
        onEndReachedThreshold={0.08}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        keyExtractor={(item, index) => index}
        {...props}
      />
    </Animated.View>
  );
};

ListOfNotifications.propTypes = {
  loadingMore: PropTypes.bool,
  detailScreen: PropTypes.string,
  onRefresh: PropTypes.func,
  isRefresh: PropTypes.bool,
};

export default ListOfNotifications;
