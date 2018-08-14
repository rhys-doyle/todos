import React from "react";
import "./field.css";
import Item from "./item";
import StatusBar from "./statusBar";

class Field extends React.Component {
  state = {
    value: "",
    todos: []
  };

  remove = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos.splice(index, 1);
    this.setState({ todos: cloneTodos });
  };

  clearCompleted = () => {
    const cloneTodos = this.state.todos.slice();
    let loop = -1;
    cloneTodos.forEach(obj => {
      loop = loop + 1;
      if (!obj.active) {
        cloneTodos.splice(loop, 1);
        console.log(cloneTodos);
      }
    });
    this.setState({ todos: cloneTodos });
  };

  keyCheck = event => {
    if (event.keyCode === 13) {
      const cloneTodos = this.state.todos.slice();
      cloneTodos.push({
        title: this.state.value,
        edit: false,
        lastValue: this.state.value,
        active: true
      });

      this.setState({
        todos: cloneTodos,
        value: ""
      });
    }
  };

  numberOfComplete = () => this.state.todos.filter(todo => !todo.active).length;

  doneToggle = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].active = !cloneTodos[index].active;
    this.setState({ todos: cloneTodos });
  };

  setValue = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].edit = !cloneTodos[index].edit;
    cloneTodos[index].title = cloneTodos[index].lastValue;
    this.setState({ todos: cloneTodos });
  };

  handleEdit = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].edit = !cloneTodos[index].edit;
    if (!cloneTodos[index].edit && cloneTodos[index].title === "") {
      cloneTodos.splice(index, 1);
    } else {
      cloneTodos[index].lastValue = cloneTodos[index].title;
    }
    this.setState({ todos: cloneTodos });
  };

  handleOnChange = (index, newValue) => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].title = newValue.trim();
    this.setState({ todos: cloneTodos });
  };

  render() {
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
          <div className="todoListBox">
            <ul className="todoList">
              {this.state.todos.map((item, index) => {
                return (
                  <Item
                    active={this.state.todos[index].active}
                    doneToggle={this.doneToggle}
                    index={index}
                    key={`item-${index}`}
                    {...item}
                    handleEdit={this.handleEdit}
                    handleOnChange={this.handleOnChange}
                    setValue={this.setValue}
                    remove={this.remove}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <StatusBar
          completeTotal={this.numberOfComplete()}
          clearCompleted={this.clearCompleted}
          todosLength={this.state.todos.length}
        />
      </div>
    );
  }
}

export default Field;
