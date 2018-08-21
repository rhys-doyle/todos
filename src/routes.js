import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Field from "./components/field.js";

const Routes = props => {
  return (
    <BrowserRouter {...props}>
      <div>
        <Route exact path="/" component={Field} />
        <Route path="/:filter" component={Field} />
      </div>
    </BrowserRouter>
  );
};

export default Routes;
