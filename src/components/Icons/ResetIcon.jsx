import React from "react";
import Feather from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";

const ResetIcon = ({ size = 24, color = "#000" }) => {
  return <Feather name="rotate-ccw" size={size} color={color} />;
};

ResetIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default ResetIcon;
