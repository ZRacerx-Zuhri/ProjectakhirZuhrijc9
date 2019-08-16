import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../action/Action";

class Login extends Component {
  state = {
    users: []
  };

  onlogin = () => {
    const username = this.username.value;
    const password = this.Password.value;

    this.props.login(username, password);
  };

  render() {
    return (
      <React.Fragment>
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
              <label htmlFor="InputEmail">username</label>
              <input
                type="text"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="username"
                ref={input => (this.username = input)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                id="Password"
                placeholder="Password"
                ref={input => (this.Password = input)}
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={this.onlogin}
            >
              Login
            </button>
            <div style={{ marginTop: `3%` }}>
              Belum Punya Akun?
              <br />
              <a href="/register" style={{ fontWeight: `bold`, color: `blue` }}>
                Register Sekarang
              </a>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
