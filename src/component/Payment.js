import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";

class Payment extends Component {
  state = {
    pay: []
  };

  componentDidMount() {
    this.orderdetail();
  }

  orderdetail = () => {
    axios.get(`/paycart/${this.props.userID}`).then(res => {
      this.setState({ pay: res.data });
      console.log(res.data);
    });
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

const mps = state => {
  return {
    userID: state.users.id
  };
};

export default connect(mps)(Payment);
