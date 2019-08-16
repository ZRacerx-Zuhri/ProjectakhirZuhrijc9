import React, { Component } from "react";
import axios from "../config/axios";

import { connect } from "react-redux";

class ProfileUser extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`/user/${this.props.username}`).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 " style={{ borderStyle: "solid" }}>
          <div className="">
            <div className=" shadow-lg w-75 p-3 mb-5 mx-auto text-light bg-dark rounded">
              Profile of
            </div>

            <div class="d-flex justify-content-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwU5dSQilWz7sY_TlTsexxSNAZBCVJ_kFhc6JnG9ZM3Dcbzbg_"
                class="rounded float-left"
                alt="..."
              />
              <div className="d-flex flex-column bd-highlight my-auto">
                <table className="table table-sm table-dark ml-5 ">
                  <tbody>
                    <tr>
                      <td>username</td>
                    </tr>
                    <tr>
                      <td>email</td>
                    </tr>
                    <tr>
                      <td>alamat</td>
                    </tr>
                    <tr>
                      <td>mobile number</td>
                    </tr>
                  </tbody>
                </table>
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
