import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./item.css";

const handleKeyDown = (event, handleEdit, id, setValue) => {
  if (event.keyCode === 13) {
    handleEdit(id);
  } else if (event.keyCode === 27) {
    setValue(id);
  }
};

const Item = props => {
  return (
    <li className="todoItem">
      <label
        className={classnames({
          toggleBox: true,
          checked: !props.active
        })}
      >
        &nbsp;&#10004;&nbsp;
        <input
          className="toggle"
          type="checkbox"
          value="done"
          onClick={() => props.doneToggle(props.id)}
          checked={!props.active}
        />
      </label>
      <input
        className={classnames({
          todo: true,
          done: !props.active
        })}
        value={props.title}
        onBlur={() => props.handleEdit(props.id)}
        onKeyDown={event =>
          handleKeyDown(event, props.handleEdit, props.id, props.setValue)
        }
        onDoubleClick={() => props.handleEdit(props.id)}
        readOnly={!props.edit}
        onChange={event =>
          props.handleOnChange(props.index, event.target.value)
        }
      />

      <button className="remove" onClick={() => props.remove(props.id)}>
        ×
      </button>
    </li>
  );
};

Item.proptypes = {
  title: PropTypes.string.isRequired
};

export default Item;
