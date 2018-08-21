import React from "react";
import "./field.css";
import Item from "./item";
import StatusBar from "./statusBar";
import classnames from "classnames";

class Field extends React.Component {
  state = {
    value: "",
    todos: [],
    route: "all"
  };

  componentDidMount() {
    this.retrieveState();
    this.handleRouteChange(this.props.match.params.filter);
  }

  storeState = () => {
    let stateString = JSON.stringify(this.state);
    localStorage.setItem("stateInfo", stateString);
  };

  retrieveState = () => {
    let stateString = localStorage.getItem("stateInfo");
    try {
      let newState = JSON.parse(stateString);
      this.setState({
        value: "",
        todos: newState.todos,
        route: newState.route
      });
    } catch (error) {
      return;
    }
  };

  remove = id => {
    const cloneTodos = this.state.todos.slice();
    const index = this.indexOfTodo(cloneTodos, id);
    cloneTodos.splice(index, 1);
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  clearCompleted = () => {
    const cloneTodos = this.state.todos.slice();
    this.setState(
      { todos: cloneTodos.filter(todo => todo.active) },
      this.storeState
    );
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

      this.setState(
        {
          todos: cloneTodos,
          value: ""
        },
        this.storeState
      );
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

  toggleAllActive = () => {
    const cloneTodos = this.state.todos.slice();
    if (cloneTodos.filter(todo => !todo.active).length === cloneTodos.length) {
      for (var i2 = 0; i2 < cloneTodos.length; i2++) {
        cloneTodos[i2].active = !cloneTodos[i2].active;
      }
    } else {
      for (var i = 0; i < cloneTodos.length; i++) {
        if (cloneTodos[i].active) {
          cloneTodos[i].active = false;
        }
      }
    }
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  numberOfComplete = () => this.state.todos.filter(todo => !todo.active).length;

  indexOfTodo = (todos, id) => {
    return todos.map(todo => todo.id).indexOf(id);
  };

  doneToggle = id => {
    const cloneTodos = this.state.todos.slice();
    const index = this.indexOfTodo(cloneTodos, id);
    cloneTodos[index].active = !cloneTodos[index].active;
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  setValue = id => {
    const cloneTodos = this.state.todos.slice();
    const index = this.indexOfTodo(cloneTodos, id);
    cloneTodos[index].edit = !cloneTodos[index].edit;
    cloneTodos[index].title = cloneTodos[index].lastValue;
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  handleEdit = id => {
    const cloneTodos = this.state.todos.slice();
    const index = this.indexOfTodo(cloneTodos, id);
    cloneTodos[index].edit = !cloneTodos[index].edit;
    if (!cloneTodos[index].edit && cloneTodos[index].title === "") {
      cloneTodos.splice(index, 1);
    } else {
      cloneTodos[index].lastValue = cloneTodos[index].title;
    }
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  handleOnChange = (index, newValue) => {
    const cloneTodos = this.state.todos.slice();
    cloneTodos[index].title = newValue.trim();
    this.setState({ todos: cloneTodos }, this.storeState);
  };

  handleRouteChange = (route = "all") => {
    if (route !== this.state.route) {
      this.setState({ route }, this.storeState);
    }
  };

  render() {
    return (
      <div className="todoBox">
        <div className="newTodo">
          <button
            className={classnames({
              toggleChevron: true,
              hidden: this.state.todos.length ? false : true,
              visibleActive:
                this.numberOfComplete() !== this.state.todos.length
                  ? true
                  : false,
              visibleInactive:
                this.numberOfComplete() === this.state.todos.length
                  ? true
                  : false
            })}
            onClick={this.toggleAllActive}
          >
            ❯
          </button>
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
}

export default Field;
