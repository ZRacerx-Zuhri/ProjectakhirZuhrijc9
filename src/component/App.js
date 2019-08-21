import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";

import Login from "./Login";
import Register from "./Register";
import ProfileUser from "./ProfileUser";
import Cookies from "universal-cookie";
import { keeplogin } from "../action";
import { adminlogin } from "../action";
import AdminLogin from "../component/admin/Adminlogin";
import ManageProduct from "./admin/ManageProduct";

const cookie = new Cookies();

class App extends Component {
  componentWillMount() {
    var user = cookie.get("datauser");
    var admin = cookie.get("admin");

    if (user) {
      this.props.keeplogin(user);
    }
    if (admin) {
      this.props.adminlogin(admin);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileUser} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/manageproduct" component={ManageProduct} />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keeplogin, adminlogin }
)(App);
