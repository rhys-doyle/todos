import React, { Component } from "react";
import Heading from "./components/heading.js";
import Routes from "./routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading />
        <Routes />
      </div>
    );
  }
}

export default App;
