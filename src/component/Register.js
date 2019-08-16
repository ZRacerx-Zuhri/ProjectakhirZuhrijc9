import React, { Component } from "react";
import axios from "../config/axios";

class Register extends Component {
  state = {
    users: "",
    gender: ""
  };

  inputuser = () => {
    axios
      .post("/inputuser", {
        userName: this.userName.value,
        fullname: this.Fullname.value,
        email: this.Email.value,
        password: this.Password.value,
        gender: this.state.gender,
        tanggallahir: this.Tanggal.value,
        alamat: this.Alamat.value,
        nomobile: this.nomor.value
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlegender = event => {
    return this.setState({ gender: event.target.value });
  };

  renderlist = () => {
    return this.state.users;
  };

  render() {
    return (
      <React.Fragment>
        <div>{this.renderlist()}</div>

        <div
          className="container  opp3 rounded-lg"
          style={{
            marginTop: `2%`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: `auto`,

            width: `100%`,
            height: "700px"
          }}
        >
          <div className="form-row justify-content-md-center ">
            <form className=" col-sm-3 " style={{ marginTop: `6%` }}>
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder="Email"
                  ref={input => (this.Email = input)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  placeholder="Password"
                  ref={input => (this.Password = input)}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  ref={input => (this.userName = input)}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="fullname">Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Fullname"
                  ref={input => {
                    this.Fullname = input;
                  }}
                />
              </div>
            </form>

            <form className=" col-sm-3 " style={{ marginTop: `6%` }}>
              <div>Gender</div>
              <div
                className="form-check form-check-inline mb-2"
                style={{ marginTop: `5.05%` }}
              >
                <input
                  className="form-check-input "
                  type="radio"
                  value="Pria"
                  checked={this.state.gender === "Pria"}
                  onChange={this.handlegender}
                />
                <label className="form-check-label" htmlFor="gender">
                  Pria
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Wanita"
                  checked={this.state.gender === "Wanita"}
                  onChange={this.handlegender}
                />
                <label className="form-check-label" htmlFor="gender2">
                  Wanita
                </label>
              </div>
              <div className="mt-3">
                <label htmlFor="ttl">Tanggal Lahir</label>
                <input
                  type="text"
                  className="form-control"
                  id="ttl"
                  placeholder="Tanggal Lahir"
                  ref={input => {
                    this.Tanggal = input;
                  }}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="alamat">Alamat</label>
                <input
                  type="text"
                  className="form-control"
                  id="alamat"
                  placeholder="Alamat"
                  ref={input => {
                    this.Alamat = input;
                  }}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Mobile Number"
                  ref={input => {
                    this.nomor = input;
                  }}
                />
                <br />

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginTop: `2%` }}
                  onClick={this.inputuser}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;

//
