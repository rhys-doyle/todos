import React, { Component } from "react";
import Heading from "./components/heading.js";
import Field from "./components/field.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading />
        <Field />
      </div>
    );
  }
}

export default App;
