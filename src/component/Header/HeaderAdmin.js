import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../../src/style.css";
import { adminlogout } from "../../action";

class HeaderAdmin extends Component {
  adminlogout = () => {
    this.props.adminlogout();
  };

  render() {
    if (!this.props.admin)
      return (
        <div
          style={{
            width: `100%`
          }}
          className=" sticky-top"
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/Adminlogin">
              Admin PlayTeam
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

            <form
              className="form-inline my-2 my-lg-0"
              style={{ width: `100%` }}
            >
              <div className="mx-auto">Please Login to use admin features</div>
            </form>
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
            <form
              className="form-inline my-2 my-lg-0"
              style={{ width: `100%` }}
            >
              <div className="" style={{ marginLeft: `15%` }}>
                <Link to="/manageproduct">
                  <button type="button" className="btn btn-secondary">
                    Manage Product
                  </button>
                </Link>
                <Link to="/Verifikasi">
                  <button type="button" className="btn btn-primary ml-2">
                    Payment Verification
                  </button>
                </Link>
                <Link to="/adminlogin">
                  <button
                    type="button"
                    className="btn btn-primary ml-2"
                    onClick={this.adminlogout}
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
    admin: state.users.adminuser
  };
};

export default connect(
  mps,
  { adminlogout }
)(HeaderAdmin);
