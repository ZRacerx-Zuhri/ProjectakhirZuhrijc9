import React, { Component } from "react";
import axios from "../config/axios";
import Headerusers from "../component/Header/Headerusers";

import { connect } from "react-redux";

class ProfileUser extends Component {
  state = {
    usersprofile: {},
    alamatimg: ""
  };

  componentDidMount() {
    axios.get(`/users/${this.props.username}`).then(res => {
      console.log(res.data.data);
      this.setState({
        usersprofile: res.data.data,
        alamatimg: `http://localhost:2004/users/avatar/${res.data.data.avatar}`
      });
    });
  }

  renderprofile = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item col-12">
          Nama : {this.state.usersprofile.fullname}
        </li>
        <li className="list-group-item">
          Username : {this.state.usersprofile.username}
        </li>
        <li className="list-group-item">
          Email : {this.state.usersprofile.email}
        </li>
        <li className="list-group-item">
          Alamat : {this.state.usersprofile.alamat}
        </li>
        <li className="list-group-item">
          Gender : {this.state.usersprofile.gender}
        </li>
        <li className="list-group-item">
          Tanggal Lahir : {this.state.usersprofile.datelahir}
        </li>
        <li className="list-group-item">
          No. Mobile : {this.state.usersprofile.mobilenumber}
        </li>
      </ul>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Headerusers />
        <div className="container mt-5 ">
          <div className=" shadow-lg w-75 p-3 mb-5 mx-auto text-light bg-dark rounded">
            Profile of {this.props.username}
          </div>

          <div className="d-flex justify-content-start ">
            <div
              style={{
                borderRadius: `50%`,
                width: `250px`,
                height: `250px`,
                overflow: "hidden",
                marginLeft: "15%",
                backgroundImage: `url(${this.state.alamatimg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
            <div
              className="d-flex flex-column bd-highlight ml-5 col-md-5"
              // style={{ borderStyle: "solid" }}
            >
              {this.renderprofile()}
              <div className="my-3 mx-auto">
                <button className="btn btn-primary ">Edit</button>
                <button className="btn btn-danger ml-4">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mps = state => {
  return {
    userid: state.users.id,
    username: state.users.username
  };
};

export default connect(mps)(ProfileUser);
