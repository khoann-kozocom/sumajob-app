import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import PropTypes from "prop-types";
import AntDesign from "react-native-vector-icons/AntDesign";

const SelectedCard = ({ name, deleteFn }) => {
  const styles = StyleSheet.create({
    cardItem: {
      paddingHorizontal: 5,
      position: "relative",
    },
    card: {
      marginVertical: 6,
      borderRadius: 3,
      paddingVertical: 0,
      overflow: "hidden",
    },

    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
      backgroundColor: "#fff",
      paddingRight: 25,
    },
    cardText: {
      fontSize: 12,
    },
    delete: {
      position: "absolute",
      top: -2,
      right: -2,
      zIndex: 1,
    },
  });

  return (
    <View style={styles.cardItem}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardText}>{name}</Text>
        </Card.Content>
      </Card>
      <TouchableOpacity style={styles.delete} onPress={deleteFn}>
        <AntDesign name="closecircle" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};
SelectedCard.propTypes = {
  name: PropTypes.string,
  deleteFn: PropTypes.func,
};

export default SelectedCard;
