import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import PropTypes from "prop-types";

const CloseIcon = ({ size = 24, color = "#000" }) => {
  return <AntDesign name="close" size={size} color={color} />;
};

CloseIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default CloseIcon;
