import React, { Component } from "react";
import axios from "../config/axios";
import HeaderAdmin from "./Header/HeaderAdmin";
import { connect } from "react-redux";
import Notiflix from "notiflix-react";
import { Link } from "react-router-dom";

class Verifikasi extends Component {
  state = {
    payment: [],
    Approve: [],
    Reject: []
  };

  componentDidMount() {
    this.getstatus();
    this.approvepay();
    this.rejectlist();
  }
  accept = id => {
    axios.get(`/paymen/update/${id}`).then(res => {
      this.getstatus();
    });
  };

  approvepay = async () => {
    let res = await axios.get(`/approvalpay/`);
    this.setState({ Approve: res.data });
  };

  getstatus = () => {
    axios.get(`/paymentuser`).then(res => {
      this.setState({ payment: res.data });
    });
  };

  reject = async id => {
    await axios.patch(`/reject/${id}`);
    this.getstatus();
  };

  rejectlist = async () => {
    let res = await axios.get("/rejectlist");
    this.setState({ Reject: res.data });
  };

  renderPay = () => {
    return this.state.payment.map(val => (
      <tr>
        <td scope="col">{val.fullname}</td>
        <td scope="col">{val.paymentstatus}</td>
        <td scope="col"> Rp. {val.total_harga}</td>
        <td scope="col">
          <img
            style={{ width: "300px", height: "300px" }}
            src={`http://localhost:2004/bukti/${val.buktipembayaran}`}
          />
        </td>
        <td scope="col">{val.id}</td>
        <button
          className="btn btn-primary mr-2"
          onClick={() => this.accept(val.id)}
        >
          Accept
        </button>

        <button
          className="btn btn-danger"
          onClick={() => {
            Notiflix.Confirm.Show(
              "Confirmation",
              "Are You Sure To Cancel This Payment",
              "Yes",
              "No",
              () => {
                this.reject(val.id);
              },
              function() {
                Notiflix.Report.Failure("Delete Failed", " ");
              }
            );
          }}
        >
          Reject
        </button>
      </tr>
    ));
  };

  renderapprove = () => {
    return this.state.Approve.map(val => (
      <tr>
        <td scope="col">{val.fullname}</td>
        <td scope="col">{val.paymentstatus}</td>
        <td scope="col"> Rp. {val.total_harga.toLocaleString()}</td>
        <td scope="col">{val.id}</td>

        <Link to={`/orderdetail/${val.id}`}>
          <button className="btn btn-outline-primary btn-block">
            Order Details
          </button>
        </Link>
      </tr>
    ));
  };

  renderReject = () => {
    return this.state.Reject.map(val => (
      <tr>
        <td scope="col">{val.fullname}</td>
        <td scope="col">{val.paymentstatus}</td>
        <td scope="col"> Rp. {val.total_harga.toLocaleString()}</td>
        <td scope="col">{val.id}</td>

        <Link to={`/orderdetail/${val.id}`}>
          <button className="btn btn-outline-primary btn-block">
            Order Details
          </button>
        </Link>
      </tr>
    ));
  };

  render() {
    return (
      <React.Fragment>
        <HeaderAdmin />
        <div className="container">
          <h2 className="display-8 text-center">
            Waiting Confirmation Payment
          </h2>

          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">user name</th>
                <th scope="col">payment status</th>
                <th scope="col">Total Payment</th>
                <th scope="col">bukti</th>
                <th scope="col">order id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.renderPay()}</tbody>
          </table>

          <h2 className="display-8 text-center">Approval payment</h2>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">user name</th>
                <th scope="col">payment status</th>
                <th scope="col">Total Payment</th>

                <th scope="col">order id</th>
              </tr>
            </thead>
            <tbody>{this.renderapprove()}</tbody>
          </table>

          <h2 className="display-8 text-center">List Reject payment</h2>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">user name</th>
                <th scope="col">payment status</th>
                <th scope="col">Total Payment</th>
                <th scope="col">order id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.renderReject()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
const mps = state => {
  return {
    userID: state.users.id,
    username: state.users.username
  };
};

export default connect(mps)(Verifikasi);
