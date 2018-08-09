import React from "react";
import "./field.css";
import Item from "./item";

class Field extends React.Component {
  state = {
    value: "",
    double: false,
    todos: []
  };

  keyCheck = event => {
    if (event.keyCode === 13) {
      const cloneTodos = this.state.todos.slice();
      cloneTodos.push({
        title: this.state.value,
        completed: false,
        edit: false
      });
      this.setState({
        todos: cloneTodos,
        value: ""
      });
    }
  };

  handleEdit = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].edit = true;
    this.setState({ todos: cloneTodos });
  };

  render() {
    console.log(this.state);
    return (
      <div className="todoBox">
        <div className="newTodo">
          <input
            className="data"
            type="text"
            autoFocus
            placeholder="What needs to be done?"
            onKeyDown={this.keyCheck}
            onChange={event => this.setState({ value: event.target.value })}
            value={this.state.value}
          />
        </div>
        <div className="todoListBox">
          <ul className="todoList">
            {this.state.todos.map((item, index) => {
              return (
                <Item
                  index={index}
                  key={`item-${index}`}
                  {...item}
                  onDoubleClick={this.handleEdit}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Field;
