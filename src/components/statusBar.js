import React from "react";
import "./statusBar.css";
import { Link } from "react-router-dom";
import classnames from "classnames";

const StatusBar = props => {
  return (
    <div className="statusBar">
      <span className="remaining">
        <strong className="total">
          {props.todosLength - props.completeTotal}
        </strong>
        {` item${
          props.todosLength - props.completeTotal === 1 ? " left" : "s left"
        }`}
        <strong
          className={classnames({
            show: props.todosLength - props.completeTotal === 1 ? true : false,
            notShow:
              props.todosLength - props.completeTotal === 1 ? false : true
          })}
        >
          s
        </strong>
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
        <span className="spacer">&nbsp;&nbsp;</span>
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
        <span className="spacer">&nbsp;&nbsp;</span>
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
      <span
        className={classnames({
          clear: true,
          invisible: props.completeTotal ? false : true,
          visible: props.completeTotal ? true : false
        })}
        onClick={props.completeTotal ? props.clearCompleted : null}
      >
        Clear Completed
      </span>
    </div>
  );
};

export default StatusBar;
