import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
