import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const handleKeyDown = (event, handleEdit, index, setValue) => {
  if (event.keyCode === 13) {
    handleEdit(index);
  } else if (event.keyCode === 27) {
    setValue(index);
  }
};

const Item = props => {
  return (
    <li className="todoItem">
      <span className="toggleBox">
        <input
          className="toggle"
          type="checkbox"
          value="done"
          onClick={() => props.doneToggle(props.index)}
        />
      </span>
      <input
        className={classnames({
          todo: true,
          completed: !props.active
        })}
        value={props.title}
        onBlur={() => props.handleEdit(props.index)}
        onKeyDown={event =>
          handleKeyDown(event, props.handleEdit, props.index, props.setValue)
        }
        onDoubleClick={() => props.handleEdit(props.index)}
        readOnly={!props.edit}
        onChange={event =>
          props.handleOnChange(props.index, event.target.value)
        }
      />

      <button className="remove" onClick={() => props.remove(props.index)} />
    </li>
  );
};

Item.proptypes = {
  title: PropTypes.string.isRequired
};

export default Item;
