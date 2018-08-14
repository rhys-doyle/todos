import React from "react";

const StatusBar = props => {
  return (
    <div className="statusBar">
      <span className="remaining">
        <strong className="total">{props.activeTotal}</strong>
        {`item${props.activeTotal === 1 ? "" : "s"}`}
      </span>
      <span className="view">
        <a href="/">All</a>
        <a href="/active">Active</a>
        <a href="/completed">Completed</a>
      </span>
      <span className="clear" onClick={props.clearCompleted}>
        Clear Completed
      </span>
    </div>
  );
};

export default StatusBar;
