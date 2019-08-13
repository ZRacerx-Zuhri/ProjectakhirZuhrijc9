import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style.css";

class Header extends Component {
  render() {
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
                  <a className="dropdown-item" href="#kk">
                    Futsal
                  </a>
                  <a className="dropdown-item" href="#kk">
                    Basket
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#kk">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              style={{ margin: `0px` }}
            >
              <input
                className="form-control ml-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: `700px` }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 ml-3"
                type="submit"
              >
                Search
              </button>
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ marginLeft: `200px` }}
                >
                  Login
                </button>
              </Link>
              <Link to="register">
                <button type="button" className="btn btn-primary ml-2">
                  Register
                </button>
              </Link>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
