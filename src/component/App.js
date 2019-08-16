import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import ProfileUser from "./ProfileUser";
import Cookies from "universal-cookie";
import { keeplogin } from "../action/Action";
const cookie = new Cookies();

class App extends Component {
  componentWillMount() {
    var user = cookie.get("datauser");
    if (user) {
      this.props.keeplogin(user);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileUser} />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keeplogin }
)(App);
