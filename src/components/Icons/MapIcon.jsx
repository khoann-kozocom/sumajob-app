import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const MapIcon = ({ size = 24, color = "#000" }) => {
  return <FontAwesome name="map-o" size={size} color={color} />;
};

MapIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default MapIcon;
