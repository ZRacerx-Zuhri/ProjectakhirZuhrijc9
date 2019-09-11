import React, { Component } from "react";
import axios from "../config/axios";
import HeaderAdmin from "./Header/HeaderAdmin";
import { connect } from "react-redux";
import Notiflix from "notiflix-react";

class Verifikasi extends Component {
  state = {
    payment: [],
    total: 0
  };

  componentDidMount() {
    this.getstatus();
    this.totalharga();
  }
  asep = id => {
    axios.get(`/paymen/update/${id}`).then(res => {
      this.getstatus();
    });
  };

  getstatus = () => {
    axios.get(`/paymentuser`).then(res => {
      this.setState({ payment: res.data });
      // console.log(res.data);
    });
  };
  renderPay = () => {
    return this.state.payment.map(val => (
      <tr>
        <td scope="col">{val.fullname}</td>
        <td scope="col">{val.paymentstatus}</td>
        <td scope="col"> Rp. {this.state.total.toLocaleString()}</td>
        <td scope="col">
          <img
            style={{ width: "40px", height: "40px" }}
            src={`http://localhost:2004/bukti/${val.buktipembayaran}`}
          />
        </td>
        <button
          className="btn btn-primary mr-2"
          onClick={() => this.asep(val.order_id)}
        >
          Accept
        </button>

        <button
          className="btn btn-danger"
          onClick={() => {
            Notiflix.Confirm.Show(
              "Confirmation",
              "Are You Sure To Delete this product?",
              "Yes",
              "No",
              () => {
                // this.onDelete(item.id);
              },
              function() {
                Notiflix.Report.Failure("Delete Failed", " ");
              }
            );
          }}
        >
          Decline
        </button>
      </tr>
    ));
  };

  totalharga = () => {
    axios(`/totalharga/${this.props.userID}`).then(res => {
      this.setState({ total: res.data });
      console.log(res.data);
    });
  };

  // bankID: 1;
  // buktipembayaran: "foto-1567492567083.jpeg";
  // id: 1;
  // payment: "transfer";
  // paymentstatus: "Wait";
  // tanggalorder: "2019-09-03T02:25:26.000Z";
  // userID: 1;

  render() {
    return (
      <React.Fragment>
        <HeaderAdmin />
        <div className="container">
          <h1 className="display-8 text-center">List payment</h1>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">payment status</th>
                <th scope="col">Total Payment</th>
                <th scope="col">bukti</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.renderPay()}</tbody>
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
