import React, { Component } from "react";
import Headerusers from "./Header/Headerusers";
import axios from "../config/axios";
import { connect } from "react-redux";
import Notiflix from "notiflix-react";
import { Link, Redirect } from "react-router-dom";

class Cart extends Component {
  state = {
    mycart: []
  };

  componentDidMount() {
    this.getmycart();
  }

  rendercart = () => {
    return this.state.mycart.map(cart => (
      <tr>
        <td>{cart.productname}</td>
        <td>{cart.lokasi}</td>
        <td>{cart.date}</td>
        <td>{cart.time}</td>
        <td>Rp. {cart.price.toLocaleString()}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              Notiflix.Confirm.Show(
                "Cancel Booking",
                "Are You Sure To Cancel?",
                "Yes",
                "No",
                () => {
                  this.cancelcart(cart.id);
                },
                function() {
                  Notiflix.Report.Failure("Cancel Failure", " ");
                }
              );
            }}
          >
            cancel
          </button>
        </td>
      </tr>
    ));
  };

  totalharga = () => {
    let y = 0;
    for (let i = 0; i < this.state.mycart.length; i++) {
      y += this.state.mycart[i].price;
    }
    return y;
  };

  cancelcart = data => {
    axios.delete(`/cancel/${data}`).then(res => {
      Notiflix.Report.Success("Cancel Success", " ");
      this.getmycart();
    });
  };

  getmycart = () => {
    axios.get(`/mycart/${this.props.userID}`).then(res => {
      // if (res.data.length == 0)
      // return Notiflix.Report.Failure("You dont have cart", " ");
      this.setState({ mycart: res.data });
      console.log(res.data);
    });
  };

  render() {
    if (!this.props.userID) return <Redirect to="/login" />;
    return (
      <React.Fragment>
        <Headerusers />
        <div className="container col-9" style={{ marginTop: "90px" }}>
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
          </table>
          <Link to="/order">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mt-5 mb-5"
            >
              Add to Payment
            </button>
          </Link>
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
export default connect(mps)(Cart);
