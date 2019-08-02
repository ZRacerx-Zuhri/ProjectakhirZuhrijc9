import React, { Component } from "react";
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#kk">
            PlayTeam
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-2">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#kk"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Category
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#kk">
                    Action
                  </a>
                  <a class="dropdown-item" href="#kk">
                    Another action
                  </a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#kk">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0" style={{ margin: `0px` }}>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: `800px` }}
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button type="button" className="btn btn-success ml-5">
                Login
              </button>
              <button type="button" className="btn btn-primary ml-2">
                Register
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
