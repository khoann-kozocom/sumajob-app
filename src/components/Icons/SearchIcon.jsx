import React from "react";
import Feather from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";

const SearchIcon = ({ size = 24, color = "#000" }) => {
  return <Feather name="search" size={size} color={color} />;
};

SearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default SearchIcon;
