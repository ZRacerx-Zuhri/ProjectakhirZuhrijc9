import React, { Component } from "react";
import { connect } from "react-redux";
import { loginadmin } from "../../action";
import HeaderAdmin from "../Header/HeaderAdmin";
// import { Link } from "react-router-dom";

class LoginAdmin extends Component {
  onlogin = () => {
    const useradmin = this.useradmin.value;
    const password = this.password.value;

    this.props.loginadmin(useradmin, password);
  };

  render() {
    return (
      <React.Fragment>
        <HeaderAdmin />
        <div
          className="row mx-auto opp2"
          style={{
            marginTop: "5%",
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: `60% 100%`
          }}
        >
          <form
            className="container col-sm-3 "
            style={{ width: `50px`, height: "600px" }}
          >
            <div className="form-group" style={{ marginTop: `40%` }}>
              <label htmlFor="InputEmail">Admin Username</label>
              <input
                type="text"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="Admin Username"
                ref={input => (this.useradmin = input)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                id="Password"
                placeholder="Password"
                ref={input => (this.password = input)}
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={this.onlogin}
            >
              Login
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { loginadmin }
)(LoginAdmin);
