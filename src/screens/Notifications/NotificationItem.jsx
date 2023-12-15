import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

const NotificationItem = React.forwardRef(
  ({ detailScreen, id, title, body, createdAt }, ref) => {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
      container: {
        borderColor: "rgba(0, 0, 0, 0.2 )",
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
      },
      createdAt: {
        textAlign: "right",
      },
    });

    return (
      <TouchableOpacity
        style={styles.container}
        ref={ref}
        onPress={() => {
          navigation.navigate(detailScreen, { id });
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text>{body}</Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </TouchableOpacity>
    );
  }
);
NotificationItem.displayName = "NotificationItem";

NotificationItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.number,
  detailScreen: PropTypes.string,
};

export default memo(NotificationItem);
