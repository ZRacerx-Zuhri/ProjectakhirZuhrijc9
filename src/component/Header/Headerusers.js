import React, { Component } from "react";

import { connect } from "react-redux";
import "../../../src/style.css";
import { logout, search } from "../../action";

class Headerusers extends Component {
  state = {
    search: ""
  };
  logout = () => {
    this.props.logout();
  };

  onSearch = () => {
    this.props.search(this.searchStr.value);
  };

  show = () => {
    document.getElementById("bar").style.width = "100%";
    document.getElementById("bar").style.height = "100%";
  };

  hide = () => {
    document.getElementById("bar").style.width = "0";
    document.getElementById("bar").style.height = "0%";
  };

  render() {
    if (!this.props.username)
      return (
        <React.Fragment>
          <div className="header">
            <div className="humnav">
              <nav className="navbar navbar-dark ">
                <button
                  className="humnav navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={this.show}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </nav>
            </div>

            <a href="/" className="anchortitle">
              PlayTeam
            </a>

            <ul className="take">
              <li className="login">
                <a href="/login" className="cas">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="cas">
                  Register >
                </a>
              </li>
            </ul>
          </div>

          <div id="bar" className="s" onClick={this.hide}>
            <div className="row list ">
              <div className="col-11 mx-auto my-auto">
                <div className="list-group">
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    Home
                  </a>
                  <a
                    href="/product"
                    className="list-group-item list-group-item-action"
                  >
                    Venue
                  </a>
                  <a
                    href="/register"
                    className="list-group-item list-group-item-action"
                  >
                    Register
                  </a>
                  <a
                    href="/login"
                    className="list-group-item list-group-item-action"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <div className="header">
          <div className="humnav">
            <nav className="navbar navbar-dark ">
              <button
                className="humnav navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.show}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </div>
          <div>
            <a href="/" className="anchortitle">
              PlayTeam
            </a>
          </div>
          <ul className="take">
            <li className="login">
              <a href="/product" className="cas">
                Venue
              </a>
            </li>
            <li>
              <a href="/profile" className="cas">
                Profile
              </a>
            </li>
          </ul>
        </div>

        <div id="bar" className="s" onClick={this.hide}>
          <div className="row list ">
            <div class="col-11 mx-auto my-auto">
              <div class="list-group">
                <a href="/" class="list-group-item list-group-item-action">
                  Home
                </a>
                <a
                  href="/product"
                  class="list-group-item list-group-item-action"
                >
                  Venue
                </a>
                <a
                  href="/payment"
                  class="list-group-item list-group-item-action"
                >
                  Transaction
                </a>
                <a
                  href="/login"
                  onClick={this.logout}
                  class="list-group-item list-group-item-action"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mps = state => {
  return {
    username: state.users.username
  };
};

export default connect(
  mps,
  { logout, search }
)(Headerusers);
