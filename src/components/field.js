import React from "react";
import "./field.css";
import Item from "./item";
import StatusBar from "./statusBar";

class Field extends React.Component {
  state = {
    value: "",
    todos: [],
    route: "all"
  };

  storeState = () => {
    let stateString = JSON.stringify(this.state);
    localStorage.setItem("stateInfo", stateString);
  };

  retrieveState = () => {
    let stateString = localStorage.getItem("stateInfo");
    let newState = JSON.parse(stateString);
    this.setState({
      value: "",
      todos: newState.todos,
      route: newState.route
    });
  };

  remove = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos.splice(index, 1);
    this.setState({ todos: cloneTodos });
    this.storeState();
  };

  clearCompleted = () => {
    const cloneTodos = this.state.todos.slice();
    let loop = -1;
    cloneTodos.forEach(obj => {
      loop = loop + 1;
      if (!obj.active) {
        cloneTodos.splice(loop, 1);
      }
    });
    this.setState({ todos: cloneTodos });
    this.storeState();
  };

  keyCheck = event => {
    if (event.keyCode === 13) {
      const cloneTodos = this.state.todos.slice();
      cloneTodos.push({
        title: this.state.value,
        edit: false,
        lastValue: this.state.value,
        active: true,
        id: new Date().getTime()
      });

      this.setState({
        todos: cloneTodos,
        value: ""
      });
      this.storeState();
    }
  };

  filterTodos = () => {
    const { route, todos } = this.state;
    if (route === "active") {
      return todos.filter(todo => todo.active);
    } else if (route === "completed") {
      return todos.filter(todo => !todo.active);
    }
    return todos;
  };

  numberOfComplete = () => this.state.todos.filter(todo => !todo.active).length;

  doneToggle = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].active = !cloneTodos[index].active;
    this.setState({ todos: cloneTodos });
    this.storeState();
  };

  setValue = index => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].edit = !cloneTodos[index].edit;
    cloneTodos[index].title = cloneTodos[index].lastValue;
    this.setState({ todos: cloneTodos });
    this.storeState();
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
    this.storeState();
  };

  handleOnChange = (index, newValue) => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].title = newValue.trim();
    this.setState({ todos: cloneTodos });
    this.storeState();
  };

  handleRouteChange = route => {
    this.setState({ route });
    this.storeState();
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
              {this.filterTodos().map((item, index) => {
                return (
                  <Item
                    active={this.state.todos[index].active}
                    doneToggle={this.doneToggle}
                    index={index}
                    key={item.id}
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
        {!!this.state.todos.length && (
          <StatusBar
            completeTotal={this.numberOfComplete()}
            clearCompleted={this.clearCompleted}
            todosLength={this.state.todos.length}
            handleRouteChange={this.handleRouteChange}
            currentRoute={this.state.route}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.retrieveState();
  }
}

export default Field;
