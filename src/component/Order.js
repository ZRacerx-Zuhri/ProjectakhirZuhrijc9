import React, { Component } from "react";
// import { connect } from "react-redux";

import Headerusers from "./Header/Headerusers";
import axios from "../config/axios";
import { connect } from "react-redux";
import Notiflix from "notiflix-react";
import { Link } from "react-router-dom";
import { stat } from "fs";

class Order extends Component {
  state = {
    mycart: [],
    bank: [],
    userprofile: {}
  };

  componentDidMount() {
    this.getmycart();
    this.getdatabank();
    this.getuser();
  }

  toorder = (getdatabank = () => {
    return axios.get("/getbank").then(res => {
      this.setState({ bank: res.data });
    });
  });

  renderbank = () => {
    return this.state.bank.map(list => (
      <option value={list.namabank}>{list.namabank}</option>
    ));
  };

  rendercart = () => {
    return this.state.mycart.map(cart => (
      <tr>
        <td>{cart.productname}</td>

        <td>{cart.lokasi}</td>

        <td>{cart.date}</td>

        <td>{cart.time}</td>

        <td>Rp. {cart.price.toLocaleString()}</td>
      </tr>
    ));
  };

  getuser = () => {
    axios.get(`/users/${this.props.username}`).then(res => {
      this.setState({
        userprofile: res.data
      });
    });
  };

  totalharga = () => {
    let y = 0;
    for (let i = 0; i < this.state.mycart.length; i++) {
      y += this.state.mycart[i].price;
    }
    return y;
  };

  getmycart = () => {
    axios.get(`/mycart/${this.props.userID}`).then(res => {
      this.setState({ mycart: res.data });
      console.log(res.data);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Headerusers />
        <div className="container col-6 mt-5">
          <table className="table">
            <thead className="bg-info">
              <tr>
                <th>Venue</th>
                <th>Lokasi</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.rendercart()}</tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th>Total</th>
              <td>Rp. {this.totalharga().toLocaleString()}</td>
            </tr>
            <thead className="bg-info">
              <tr>
                <th col-4>Name</th>
                <th>No. Mobile </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.userprofile.fullname}</td>

                <td>{this.state.userprofile.mobilenumber}</td>
              </tr>
            </tbody>
          </table>

          <div class="input-group mb-3">
            <select class="custom-select" id="inputGroupSelect02">
              <option selected>Pilih Pembayaran</option>
              <option value="1">Transfer</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text" for="inputGroupSelect02">
                Options
              </label>
            </div>
          </div>
          <div class="input-group mb-3">
            <select class="custom-select" id="inputGroupSelect02">
              <option selected>Pilih Bank</option>
              {this.renderbank()}
            </select>
            <div class="input-group-append">
              <label class="input-group-text" for="inputGroupSelect02">
                Options
              </label>
            </div>
          </div>
          <Link to="/tes">
            <button className="btn btn-primary ">Bayar</button>
          </Link>
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

export default connect(mps)(Order);
