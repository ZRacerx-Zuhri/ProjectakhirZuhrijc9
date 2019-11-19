import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";
import Notiflix from "notiflix-react";
import Headerusers from "./Header/Headerusers";
import { Link, Redirect } from "react-router-dom";

class Payment extends Component {
  state = {
    seid: 0,
    waitpay: [],
    confirmpay: [],
    approvepay: [],
    rejectedpay: []
  };

  componentDidMount() {
    this.waitpayment();
    this.confirmpayment();
    this.approvalpay();
    this.rejectlist();
  }

  waitpayment = () => {
    axios.get(`/payment/${this.props.userID}`).then(res => {
      this.setState({ waitpay: res.data });
    });
  };

  uploadpayment = (x, y) => {
    const formData = new FormData();
    const datafoto = x.files[0];
    if (!datafoto) return Notiflix.Report.Failure("File not Found", " ");
    formData.append("foto", datafoto);

    axios.patch(`/buktipembayaran/${y}`, formData).then(res => {
      Notiflix.Report.Success("Upload Success", " ");
      this.confirmpayment();
      this.waitpayment();
      this.approvalpay();
    });
  };

  renderwaitpayment = () => {
    return this.state.waitpay.map((val, index) => (
      <tr>
        <td>{val.id}</td>
        <td>{val.namabank}</td>
        <td>{val.norek}</td>
        <td>Rp.{val.total_harga.toLocaleString("IN")}</td>

        <td>
          <input
            type="file"
            className="form-control"
            id="Foto"
            accept=".jpg, .jpeg, .png"
            ref={input => {
              this.foto = input;
            }}
          />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary ml-3 mt-2 mb-5"
            onClick={() => {
              this.uploadpayment(document.getElementById("Foto"), val.id);
            }}
          >
            Save
          </button>
        </td>
      </tr>
    ));
  };

  confirmpayment = () => {
    axios.get(`/waitpay/${this.props.userID}`).then(res => {
      this.setState({ confirmpay: res.data });
    });
  };

  renderconfirmpay = () => {
    return this.state.confirmpay.map(val => (
      <tr>
        <td>{val.id}</td>
        <td>{val.namabank}</td>
        <td>{val.norek}</td>
        <td>Rp. {val.total_harga.toLocaleString("IN")}</td>

        <td>
          <img
            style={{ width: "150px", height: "150px" }}
            src={`http://localhost:2004/bukti/${val.buktipembayaran}`}
            alt="1"
          />
        </td>
        <td>
          <Link to={`/orderdetail/${val.id}`}>
            <button className="btn btn-outline-primary btn-block">
              Order Details
            </button>
          </Link>
        </td>
      </tr>
    ));
  };

  approvalpay = () => {
    axios.get(`/approvalpay/${this.props.userID}`).then(res => {
      this.setState({ approvepay: res.data });
    });
  };
  renderapprovepay = () => {
    return this.state.approvepay.map(val => (
      <tr>
        <td>{val.id}</td>
        <td>{val.namabank}</td>
        <td>{val.norek}</td>
        <td>Rp. {val.total_harga.toLocaleString("IN")}</td>

        <td>
          <img
            style={{ width: "150px", height: "150px" }}
            src={`http://localhost:2004/bukti/${val.buktipembayaran}`}
            alt="bukti"
          />
        </td>
        <td>
          <Link to={`/orderdetail/${val.id}`}>
            <button className="btn btn-outline-primary btn-block">
              Order Details
            </button>
          </Link>
        </td>
      </tr>
    ));
  };

  rejectlist = async () => {
    let res = await axios.get(`/reject/userpay/${this.props.userID}`);
    this.setState({ rejectedpay: res.data });
  };

  renderreject = () => {
    return this.state.rejectedpay.map(val => (
      <tr>
        <td>{val.id}</td>

        <td>Rp.{val.total_harga.toLocaleString("IN")}</td>

        <td>
          <Link to={`/orderdetail/${val.id}`}>
            <button className="btn btn-outline-primary btn-block">
              Order Details
            </button>
          </Link>
        </td>
      </tr>
    ));
  };

  render() {
    if (!this.props.userID) return <Redirect to="/login" />;
    return (
      <React.Fragment>
        <Headerusers />
        <div
          className="col-9  mx-auto jumbotron jumbotron-fluid"
          style={{ marginTop: "10%" }}
        >
          <div className="container ">
            <p className="text-center">Menunggu Pembayaran</p>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Transfer Bank</th>
                  <th scope="col">No. Rek</th>
                  <th scope="col">Total pembayaran</th>
                  <th scope="col">Upload Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>{this.renderwaitpayment()}</tbody>
            </table>
          </div>
        </div>

        <div className="col-8  mx-auto my-6 jumbotron jumbotron-fluid">
          <div className="container ">
            <p className="text-center">Waiting Approval</p>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Transfer Bank</th>
                  <th scope="col">No. Rek</th>
                  <th scope="col">Total pembayaran</th>
                  <th scope="col">Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>{this.renderconfirmpay()}</tbody>
            </table>
          </div>
        </div>

        <div className="col-8  mx-auto my-6 jumbotron jumbotron-fluid">
          <div className="container ">
            <p className="text-center">Approve Payment</p>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Transfer Bank</th>
                  <th scope="col">No. Rek</th>
                  <th scope="col">Total pembayaran</th>
                  <th scope="col">Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>{this.renderapprovepay()}</tbody>
            </table>
          </div>
        </div>

        <div className="col-8  mx-auto my-6 jumbotron jumbotron-fluid">
          <div className="container ">
            <p className="text-center">Rejected Payment</p>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Total pembayaran</th>
                </tr>
              </thead>
              <tbody>{this.renderreject()}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mps = state => {
  return {
    userID: state.users.id
  };
};

export default connect(mps)(Payment);
