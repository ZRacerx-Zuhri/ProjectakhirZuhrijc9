import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../../src/style.css";
import { logout } from "../../action";

class Header extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    if (!this.props.usernam)
      return (
        <div
          style={{
            width: `100%`
          }}
          className=" sticky-top"
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
                    <a className="dropdown-item" href="#kk">
                      Indoor
                    </a>
                    <a className="dropdown-item" href="#kk">
                      Outdoor
                    </a>
                  </div>
                </li>
              </ul>
              <form
                className="form-inline my-2 my-lg-0"
                style={{ width: `100%` }}
              >
                <input
                  className="form-control ml-5"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ width: `60%` }}
                />
                <button className="btn btn-outline-success mx-3" type="submit">
                  Search
                </button>
                <div style={{ marginLeft: `10%` }}>
                  <Link to="/login">
                    <button type="button" className="btn btn-success">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="button" className="btn btn-primary ml-3">
                      Register
                    </button>
                  </Link>
                </div>
              </form>
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
                  <a className="dropdown-item" href="#kk">
                    Indoor
                  </a>
                  <a className="dropdown-item" href="#kk">
                    Outdoor
                  </a>
                </div>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              style={{ width: `100%` }}
            >
              <input
                className="form-control ml-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: `60%` }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 ml-3"
                type="submit"
              >
                Search
              </button>
              <div className="" style={{ marginLeft: `15%` }}>
                <Link to="/profile">
                  <button type="button" className="btn btn-secondary">
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
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mps = state => {
  return {
    usernam: state.users.username,
    admin: state.users.adminuser
  };
};

export default connect(
  mps,
  { logout }
)(Header);
