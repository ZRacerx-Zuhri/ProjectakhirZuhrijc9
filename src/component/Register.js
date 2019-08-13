import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <React.Fragment>
        <form
          style={{
            width: `900px`,
            height: `700px`,
            marginTop: `20px`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            position: "relative"
          }}
          className="mx-auto opp3 "
        >
          <div className="absolut">
            <label
              for="email"
              style={{ marginLeft: `100px`, marginTop: `100px` }}
            >
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              style={{ width: `280px`, marginLeft: `100px` }}
            />

            <label
              for="username"
              style={{ marginLeft: `100px`, marginTop: `10px` }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control "
              placeholder="Username"
              style={{ width: `280px`, marginLeft: `100px` }}
            />

            <label
              for="exampleInputPassword1"
              style={{ marginLeft: `100px`, marginTop: `10px` }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              style={{ width: `280px`, marginLeft: `100px` }}
            />

            <label
              for="fullname"
              style={{ marginLeft: `100px`, marginTop: `10px` }}
            >
              Fullname
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Fullname"
              style={{ width: `280px`, marginLeft: `100px` }}
            />
          </div>
          <div
            className="form-check form-check-inline"
            style={{ marginLeft: `500px`, marginTop: `100px` }}
          >
            Gender
          </div>
          <div
            className="form-check form-check-inline"
            style={{ marginLeft: `500px`, marginTop: `10px` }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Pria"
            />
            <label className="form-check-label" for="inlineRadio1">
              Pria
            </label>
          </div>
          <div
            className="form-check form-check-inline"
            style={{ marginLeft: `20px` }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Wanita"
            />
            <label className="form-check-label" for="inlineRadio2">
              Wanita
            </label>
          </div>
          <br />
          <label for="ttl" style={{ marginLeft: `500px`, marginTop: `20px` }}>
            Tanggal Lahir
          </label>
          <input
            type="text"
            className="form-control "
            id="ttl"
            placeholder="Tanggal Lahir"
            style={{ width: `280px`, marginLeft: "500px" }}
          />
          <label
            for="Alamat"
            style={{ marginLeft: `500px`, marginTop: `10px` }}
          >
            Alamat
          </label>
          <input
            type="text"
            className="form-control"
            id="Alamat"
            aria-describedby="emailHelp"
            placeholder="Alamat"
            style={{ width: `280px`, marginLeft: `500px` }}
          />
          <label
            for="Notelp"
            style={{ marginLeft: `500px`, marginTop: `10px` }}
          >
            No. Mobile
          </label>
          <input
            type="text"
            className="form-control"
            id="Notelp"
            placeholder="No Mobile"
            style={{ width: `280px`, marginLeft: `500px` }}
          />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: `500px`, marginTop: `10px` }}
          >
            Register
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
