import React from "react";
import Item from "./item.js";
import PropTypes from "prop-types";

const BuildItem = props => {
  const isValue = props.isValue;
  if (isValue !== "" && isEnter) {
    return <Item todo={props.todo} double={props.double} />;
  } else {
    return null;
  }
};

BuildItem.proptypes = {
  isEnter: PropTypes.bool.isRequired,
  double: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired,
  isValue: PropTypes.string.isRequired
};

export default BuildItem;
