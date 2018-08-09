import React from "react";
import PropTypes from "prop-types";

const Item = props => {
  return (
    <li className="todoItem">
      <input className="toggle" type="checkbox" value="completed" />
      <label
        className="todoName"
        contenteditable={props.double}
        onDoubleClick={props.double}
      >
        {props.todo}
      </label>
      <button className="remove" />
    </li>
  );
};

Item.proptypes = {
  double: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired
};

export default Item;
