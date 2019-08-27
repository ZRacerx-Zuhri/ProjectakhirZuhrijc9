import React, { Component } from "react";
import axios from "../config/axios";
import Headerusers from "../component/Header/Headerusers";
import { isEmail } from "validator";
import Notiflix from "notiflix-react";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    gender: "",
    Alamat: "",
    nomobile: "",
    tanggallahir: "",
    fullname: ""
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
        return Notiflix.Report.Failure(
          "Registration Failed",
          "Mohon Lengkapi Data",
          "Ok"
        );
      } else if (!isEmail(email)) {
        return Notiflix.Report.Failure(
          "Registration Failed",
          "Harap Menggunakan alamat Email",
          "Ok"
        );
      } else if (new Date(tanggallahir) > new Date("2006-01-01")) {
        return Notiflix.Report.Failure(
          "Registration Failed",
          "Usia Belum Cukup Umur min 13 Tahun",
          "Ok"
        );
      } else {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].email === email) {
            return Notiflix.Report.Failure(
              "Registration Failed",
              "email sudah pernah digunakan",
              "Ok"
            );
          } else if (
            res.data[i].username.toLowerCase() === username.toLowerCase()
          ) {
            return Notiflix.Report.Failure(
              "Registration Failed",
              "username sudah pernah digunakan",
              "Ok"
            );
          } else if (res.data[i].mobilenumber === nomobile) {
            return Notiflix.Report.Failure(
              "Registration Failed",
              "no Mobile sudah didaftarkan",
              "Ok"
            );
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
            this.setState({
              username: "",
              email: "",
              password: "",
              Alamat: "",
              nomobile: "",
              tanggallahir: "",
              fullname: ""
            });
            Notiflix.Report.Success("Registration Success", " ", "ok");
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  handlechange = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  handlegender = event => {
    return this.setState({ gender: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Headerusers />

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
                  type="email"
                  className="form-control"
                  name="email"
                  id="Email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handlechange}
                  ref={input => (this.Email = input)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlechange}
                  ref={input => (this.Password = input)}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handlechange}
                  ref={input => (this.userName = input)}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="fullname">Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  placeholder="Fullname"
                  value={this.state.fullname}
                  onChange={this.handlechange}
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
                  id="male"
                  checked={this.state.gender === "Pria"}
                  onChange={this.handlegender}
                />
                <label className="form-check-label" htmlFor="male">
                  Pria
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="female"
                  value="Wanita"
                  checked={this.state.gender === "Wanita"}
                  onChange={this.handlegender}
                />
                <label className="form-check-label" htmlFor="female">
                  Wanita
                </label>
              </div>
              <div className="mt-3">
                <label htmlFor="ttl">Tanggal Lahir</label>
                <input
                  type="date"
                  className="form-control"
                  id="ttl"
                  name="tanggallahir"
                  placeholder="Tanggal Lahir"
                  value={this.state.tanggallahir}
                  onChange={this.handlechange}
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
                  name="Alamat"
                  placeholder="Alamat"
                  value={this.state.Alamat}
                  onChange={this.handlechange}
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
                  name="nomobile"
                  placeholder="Mobile Number"
                  value={this.state.nomobile}
                  onChange={this.handlechange}
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
