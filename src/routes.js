import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Routes = props => {
  return (
    <BrowserRouter {...props}>
      <Route path="/" component={App}>
        <Route path="/active" component={App} />
        <Route path="/completed" component={App} />
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
