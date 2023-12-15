import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getBanner } from "../../services/settings";
import { QUERY_KEY } from "../../config/queryKeys";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";

const HomeBanner = ({ bannerHeight }) => {
  const { data: banner } = useQuery({
    queryFn: () => getBanner("home"),
    queryKey: QUERY_KEY.BANNER_HOME,
  });
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: bannerHeight,
    },
  });
  return (
    <Animated.View>
      <Animated.View>
        {banner?.success && (
          <Image
            style={styles.image}
            source={{ uri: banner.data.data.image }}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};
HomeBanner.propTypes = {
  bannerHeight: PropTypes.number,
};

export default HomeBanner;
