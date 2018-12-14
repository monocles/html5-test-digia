import React, { Component } from "react";
import Header from "./components/Header";
import List from "./components/List";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="inner">
          <h1 className="heading">List of participants</h1>
          <List />
        </div>
      </div>
    );
  }
}

export default App;
