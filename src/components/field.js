import React from "react";
import "./field.css";
import BuildItem from "./buildItem";

class Field extends React.Component {
  defaultState = {
    value: "",
    keyDown: false,
    double: false
  };

  keyCheck = event => {
    return event.target.keyCode === 13 ? true : false;
  };

  render() {
    return (
      <div className="todoBox">
        <input
          className="data"
          type="text"
          autofocus="true"
          placeholder="What needs to be done?"
          onKeyDown={event => this.setState({ keyDown: this.keyCheck(event) })}
          onChange={event => this.setState({ value: event.target.value })}
        />
        <BuildItem
          isValue={this.state.value}
          isEnter={this.state.keyDown}
          double={this.state.double}
          todo={this.state.value}
        />
      </div>
    );
  }
}

export default Field;
