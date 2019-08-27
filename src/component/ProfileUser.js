import React, { Component } from "react";
import axios from "../config/axios";
import Headerusers from "../component/Header/Headerusers";
import background from "../picture/noimage.png";
import Notiflix from "notiflix-react";
import { logout } from "../action";

import { connect } from "react-redux";

class ProfileUser extends Component {
  state = {
    usersprofile: {},
    alamatimg: "",
    pass: ""
  };

  componentDidMount() {
    this.getdata();
  }

  desk = e => {
    this.setState({ pass: e.target.value });
  };
  desk2 = () => {
    this.setState({ pass: "" });
  };

  getdata = () => {
    axios.get(`/users/${this.props.username}`).then(res => {
      this.setState({
        usersprofile: res.data,
        alamatimg: `http://localhost:2004/users/avatar/${res.data.avatar}`
      });
    });
  };

  editprofile = () => {
    const formData = new FormData();

    const avatar = this.Avatar.files[0];
    const data_fullname = this.fullname.value;
    const data_email = this.email.value;
    const data_alamat = this.alamat.value;
    const data_password = this.password.value;

    // field
    formData.append("Avatar", avatar);
    formData.append("fullname", data_fullname);
    formData.append("email", data_email);
    formData.append("alamat", data_alamat);
    formData.append("Password", data_password);

    axios
      .patch(`/user/update/${this.props.username}`, formData)
      .then(res => {
        if (
          !avatar ||
          data_fullname === "" ||
          data_email === "" ||
          data_alamat === ""
        )
          return Notiflix.Report.Failure("Please Fill Data", " ");
        if (typeof res.data === "string")
          return Notiflix.Report.Failure("Incorrect Password", " ");
        Notiflix.Report.Success("Update Profile Success", " ");
        //get Data
        this.getdata();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Delete profile
  ondelete = () => {
    axios
      .delete(`/user/delete/${this.props.userid}`)
      .then(res => {
        Notiflix.Report.Success("Deactivate Succes", " ");
        this.props.logout();
      })
      .catch(err => console.log(err));
  };

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
    if (!this.props.username) return <div>Please Login To use this Fiture</div>;
    if (!this.state.usersprofile.avatar)
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
                  borderStyle: "solid",
                  borderColor: "grey",
                  backgroundImage: `url(${background})`,
                  backgroundSize: "60%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              />
              <div
                className="d-flex flex-column bd-highlight ml-5 col-md-5"
                //style={{ borderStyle: "solid" }}
              >
                {this.renderprofile()}
                <div className="my-3 mx-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={this.desk2}
                  >
                    Edit Profile
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Edit Profile
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form
                            className="container col "
                            style={{
                              width: `100%`,
                              height: "100%"
                              // borderStyle: "solid"
                            }}
                          >
                            <div
                              className="form-group"
                              style={{ marginTop: `5%` }}
                            >
                              <label htmlFor="fullname">Fullname</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                placeholder="Fullname"
                                defaultValue={this.state.usersprofile.fullname}
                                ref={input => (this.fullname = input)}
                              />
                            </div>

                            <div
                              className="form-group"
                              style={{ marginTop: `5%` }}
                            >
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="email"
                                defaultValue={this.state.usersprofile.email}
                                ref={input => (this.email = input)}
                              />
                            </div>

                            <div
                              className="form-group"
                              style={{ marginTop: `5%` }}
                            >
                              <label htmlFor="alamat">Alamat</label>
                              <input
                                type="text"
                                className="form-control"
                                id="alamat"
                                placeholder="alamat"
                                defaultValue={this.state.usersprofile.alamat}
                                ref={input => (this.alamat = input)}
                              />
                            </div>

                            <div
                              className="form-group"
                              style={{ marginTop: `5%` }}
                            >
                              <label htmlFor="Foto">Upload foto</label>
                              <input
                                type="file"
                                className="form-control"
                                id="Foto"
                                name="Avatar"
                                accept=".jpg, .jpeg, .png"
                                placeholder="Foto"
                                ref={input => (this.Avatar = input)}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="Password">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="Password"
                                placeholder="Password"
                                value={this.state.pass}
                                onChange={this.desk}
                                ref={input => (this.password = input)}
                              />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => {
                              this.editprofile();
                            }}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger ml-3"
                    onClick={() => {
                      Notiflix.Confirm.Show(
                        "Confirmation",
                        "Are You Sure To Deactivate Your Acount?",
                        "Yes",
                        "No",
                        () => {
                          this.ondelete();
                        },
                        function() {
                          Notiflix.Report.Failure("Deactivate Failed", " ");
                        }
                      );
                    }}
                  >
                    Deactivate Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
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
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            />
            <div
              className="d-flex flex-column bd-highlight ml-5 col-md-5"
              // style={{ borderStyle: "solid" }}
            >
              {this.renderprofile()}
              <div className="my-3 mx-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={this.desk2}
                >
                  Edit Profile
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit Profile
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form
                          className="container col "
                          style={{
                            width: `100%`,
                            height: "100%"
                            // borderStyle: "solid"
                          }}
                        >
                          <div
                            className="form-group"
                            style={{ marginTop: `5%` }}
                          >
                            <label htmlFor="fullname">Fullname</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullname"
                              placeholder="Fullname"
                              defaultValue={this.state.usersprofile.fullname}
                              ref={input => (this.fullname = input)}
                            />
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: `5%` }}
                          >
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="email"
                              defaultValue={this.state.usersprofile.email}
                              ref={input => (this.email = input)}
                            />
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: `5%` }}
                          >
                            <label htmlFor="alamat">Alamat</label>
                            <input
                              type="text"
                              className="form-control"
                              id="alamat"
                              placeholder="alamat"
                              defaultValue={this.state.usersprofile.alamat}
                              ref={input => (this.alamat = input)}
                            />
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: `5%` }}
                          >
                            <label htmlFor="Foto">Upload foto</label>
                            <input
                              type="file"
                              className="form-control"
                              id="Foto"
                              name="Avatar"
                              accept=".jpg, .jpeg, .png"
                              placeholder="Foto"
                              ref={input => (this.Avatar = input)}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="Password"
                              placeholder="Password"
                              value={this.state.pass}
                              onChange={this.desk}
                              ref={input => (this.password = input)}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          data-dismiss="modal"
                          onClick={() => {
                            this.editprofile();
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger ml-3"
                  onClick={() => {
                    Notiflix.Confirm.Show(
                      "Deactivate Your Acount",
                      "Are You Sure To Deactivate Your Acount?",
                      "Yes",
                      "No",
                      () => {
                        this.ondelete();
                      },
                      function() {
                        Notiflix.Report.Failure("Deactivate Failure", " ");
                      }
                    );
                  }}
                >
                  Deactivate Profile
                </button>
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

export default connect(
  mps,
  { logout }
)(ProfileUser);
