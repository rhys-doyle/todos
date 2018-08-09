import React from "react";
import Item from "./item.js";
import PropTypes from "prop-types";

const BuildItem = props => {
  const isEnter = props.isEnter;
  const isValue = props.isValue;
  if (isValue !== "" && isEnter === false)
    return <Item todo={props.todo} double={props.double} />;
};

BuildItem.proptypes = {
  isEnter: PropTypes.bool.isRequired,
  double: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired,
  isValue: PropTypes.string.isRequired
};

export default BuildItem;
