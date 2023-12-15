import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import {
  AddressIcon,
  CalendarIcon,
  CurrencyIcon,
  TimeIcon,
  TrainStationIcon,
} from "../../svgs";
import PropTypes from "prop-types";
import Animated from "react-native-reanimated";
import { Divider } from "react-native-paper";

const Job = React.forwardRef(({ job, onPress }, ref) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      marginVertical: 5,
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 10,
    },
    textImageBlock: {
      flexDirection: "row",
      gap: 8,
    },
    tagStatusBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    iconTextBlock: {
      flexDirection: "row",
      alignItems: "center",
      flexShrink: 1,
      gap: 2,
    },
    divide: {
      marginVertical: 8,
    },
    jobImage: {
      width: "100%",
      height: 60,
      flex: 1,
    },
    textBlock: {
      flexShrink: 1,
    },
    tagBlock: {
      backgroundColor: "#ffb84c",
      fontWeight: "bold",
      padding: 4,
      borderRadius: 5,
    },
    statusBlock: {
      backgroundColor: "#29afe6",
      paddingHorizontal: 16,
      color: "#fff",
    },
  });
  return (
    <Animated.View ref={ref}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.textImageBlock}>
          <View style={{ flex: 2 }}>
            <View style={styles.tagStatusBlock}>
              <Text style={styles.tagBlock}>短期</Text>
              <Text style={styles.statusBlock}>応募中</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>{job?.note12}</Text>
          </View>
          <Image
            source={{ uri: job.image_url }}
            resizeMode="cover"
            style={styles.jobImage}
          />
        </View>
        <Divider style={styles.divide} />
        <View style={{ ...styles.iconTextBlock, gap: 24 }}>
          <View style={styles.iconTextBlock}>
            <AddressIcon />
            <Text style={styles.textBlock}>{job?.address1}</Text>
          </View>
          <View style={styles.iconTextBlock}>
            <TrainStationIcon />
            <Text style={styles.textBlock}>{job?.nearest_station || ""}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.iconTextBlock,
            marginTop: 4,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.iconTextBlock}>
            <CalendarIcon />
            <Text style={styles.textBlock}>
              {job?.order_dates?.working_day ?? job?.working_day}
            </Text>
          </View>
          <View style={styles.iconTextBlock}>
            <TimeIcon />
            <Text
              style={styles.textBlock}
            >{`${job?.opening_time}~${job?.closing_time}`}</Text>
          </View>
          <View style={styles.iconTextBlock}>
            <CurrencyIcon />
            <Text style={styles.textBlock}>
              {job?.supply_basics_unit_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

Job.displayName = "JobItem";

Job.propTypes = {
  job: PropTypes.objectOf(Object),
  onPress: PropTypes.func,
};

export default memo(Job);
