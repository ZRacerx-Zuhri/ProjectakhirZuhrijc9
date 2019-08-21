import React, { Component } from "react";
import axios from "../config/axios";
import Headerusers from "../component/Header/Headerusers";
import { isEmail } from "validator";

class Register extends Component {
  state = {
    users: "",
    gender: ""
  };

  inputuser = () => {
    const username = this.userName.value;
    const fullname = this.Fullname.value;
    const email = this.Email.value;
    const password = this.Password.value;
    const gender = this.state.gender;
    const tanggallahir = this.Tanggal.value;
    const alamat = this.Alamat.value;
    const nomobile = this.nomor.value;

    axios.get("/getusers").then(res => {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        gender === "" ||
        tanggallahir === "" ||
        alamat === "" ||
        nomobile === ""
      ) {
        return alert("Data Mohon Dilengkapi");
      } else if (!isEmail(email)) {
        return alert("Harap Menggunakan alamat Email");
      } else {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].email === email) {
            return alert("email sudah pernah digunakan");
          } else if (
            res.data[i].username.toLowerCase() === username.toLowerCase()
          ) {
            return alert("username sudah pernah digunakan");
          } else if (res.data[i].mobilenumber === nomobile) {
            return alert("no Mobile sudah didaftarkan");
          }
        }
      }

      axios
        .post("/inputuser", {
          userName: username,
          fullname: fullname,
          email: email,
          password: password,
          gender: gender,
          tanggallahir: tanggallahir,
          alamat: alamat,
          nomobile: nomobile
        })
        .then(res => {
          if (typeof res.data == "string") {
            console.log(res.data);
          } else {
            alert("Registrasi Berhasil");
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        <Headerusers />
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
                  id="gender"
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
                  id="gender2"
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
