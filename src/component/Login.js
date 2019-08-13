import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <form
          style={{
            width: `600px`,
            height: `700px`,
            marginTop: `70px`
          }}
          className="mx-auto opp2"
        >
          <div>
            <label
              for="exampleInputEmail1"
              style={{ marginLeft: `160px`, marginTop: `150px` }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control mx-auto"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              style={{ width: `280px` }}
            />
            <label
              for="exampleInputPassword1"
              style={{ marginLeft: `160px`, marginTop: `10px` }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control mx-auto "
              id="exampleInputPassword1"
              placeholder="Password"
              style={{ width: `280px` }}
            />

            <button
              type="submit"
              className="btn btn-success"
              style={{ marginLeft: `160px`, marginTop: `10px` }}
            >
              Login
            </button>
            <div style={{ marginLeft: `160px`, marginTop: `10px` }}>
              Belum Punya Akun?
              <br />
              <a href="/register" style={{ fontWeight: `bold` }}>
                Register Sekarang
              </a>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
