import React from "react";
import "./statusBar.css";
import { Link } from "react-router-dom";

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
        <Link
          to="/"
          className={props.currentRoute === "all" ? "currentRoute" : ""}
          onClick={event => {
            //event.preventDefault();
            props.handleRouteChange("all");
          }}
        >
          All
        </Link>
        <Link
          to="/active"
          className={props.currentRoute === "active" ? "currentRoute" : ""}
          onClick={event => {
            //event.preventDefault();
            props.handleRouteChange("active");
          }}
        >
          Active
        </Link>
        <Link
          to="/completed"
          className={props.currentRoute === "completed" ? "currentRoute" : ""}
          onClick={event => {
            //event.preventDefault();
            props.handleRouteChange("completed");
          }}
        >
          Completed
        </Link>
      </span>
      {areCompleted(props)}
    </div>
  );
};

export default StatusBar;
