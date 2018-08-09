import React from "react";
import PropTypes from "prop-types";

const Item = props => {
  return (
    <li className="todoItem">
      <input className="toggle" type="checkbox" value="done" />
      <label
        className="todoName"
        contentEditable={props.edit}
        onDoubleClick={() => props.onDoubleClick(props.index)}
      >
        {props.title}
      </label>
      <button className="remove" onClick={() => {}} />
    </li>
  );
};

Item.proptypes = {
  double: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Item;
