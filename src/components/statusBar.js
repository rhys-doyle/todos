import React from "react";
import "./statusBar.css";

const areCompleted = props => {
  if (props.todosLength - props.activeTotal) {
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
        <strong className="total">{props.activeTotal}</strong>
        {` item${props.activeTotal === 1 ? "" : "s"} left`}
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
