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
import Notiflix from "notiflix-react";
import ProductList from "./ProductList";
import ProductDetail from "../component/ProductDetail";
import Cart from "../component/Cart";
import Order from "../component/Order";

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

  componentDidMount() {
    Notiflix.Confirm.Init({
      width: "35%",
      fontFamily: "Arial",
      useGoogleFont: false,
      okButtonBackground: "red",
      titleColor: "#f30a0a"
    });

    Notiflix.Report.Init({
      width: "50%",
      cssAnimationStyle: "zoom",
      messageFontSize: "18px"
    });

    Notiflix.Loading.Circle("Please wait...");
    Notiflix.Loading.Remove(800);
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
        <Route path="/product" component={ProductList} />
        <Route path="/detailproduct/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/order" component={Order} />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keeplogin, adminlogin }
)(App);
