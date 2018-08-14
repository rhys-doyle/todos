import React from "react";
import "./statusBar.css";

const areCompleted = props => {
  if (props.completeTotal) {
    return (
      <span className="clear" onClick={props.clearCompleted}>
        Clear Completed
      </span>
    );
  }
};

const StatusBar = props => {
  return (
    <div className="statusBar">
      <span className="remaining">
        <strong className="total">
          {props.todosLength - props.completeTotal}
        </strong>
        {` item${
          props.todosLength - props.completeTotal === 1 ? "" : "s"
        } left`}
      </span>
      <span className="view">
        <a href="/" className="all">
          All
        </a>
        <a href="/active" className="active">
          Active
        </a>
        <a href="/completed" className="completed">
          Completed
        </a>
      </span>
      {areCompleted(props)}
    </div>
  );
};

export default StatusBar;
