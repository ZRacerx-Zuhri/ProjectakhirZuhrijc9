import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  render() {
    if (!this.props.username)
      return (
        <div className="sticky-top" style={{ width: "100%" }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              PlayTeam
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-2">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#kk"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item">
                      <Link to="/product-cat/Basketball">Basketball</Link>
                    </a>
                    <a className="dropdown-item">
                      <Link to="/product-cat/Football">Football</Link>
                    </a>
                  </div>
                </li>
              </ul>

              <input
                className="form-control ml-5"
                type="text"
                placeholder="Search"
                aria-label="Search"
                style={{ width: `40%` }}
                ref={input => (this.searchStr = input)}
              />
              <button
                className="btn btn-outline-success mx-3"
                onClick={this.onSearch}
              >
                Search
              </button>
              <div style={{ marginLeft: `5%` }}>
                <a
                  href="/product"
                  className="btn btn-secondary active"
                  role="button"
                  aria-pressed="true"
                >
                  Venue
                </a>
                <Link to="/login">
                  <button type="button" className="btn btn-success ml-3">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button type="button" className="btn btn-primary ml-3">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      );

    return (
      <div
        style={{
          width: `100%`
        }}
        className={"sticky-top"}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            PlayTeam
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-2">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#kk"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Category
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div className="dropdown-item">
                    <Link to="/product-cat/Basketball">Basketball</Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to="/product-cat/Football">Football</Link>
                  </div>
                </div>
              </li>
            </ul>

            <input
              className="form-control ml-5"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{ width: `40%` }}
              ref={input => (this.searchStr = input)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 ml-3"
              onClick={this.onSearch}
            >
              Search
            </button>
            <div className="" style={{ marginLeft: `5%` }}>
              <a
                href="/product"
                className="btn btn-secondary active"
                role="button"
                aria-pressed="true"
              >
                Venue
              </a>
              <Link to="/profile">
                <button type="button" className="btn btn-success ml-2">
                  Profile
                </button>
              </Link>

              <Link to="/">
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </Link>
              <Link to="/cart">
                <button type="button" className="btn btn-primary ml-2">
                  myCart
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
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
