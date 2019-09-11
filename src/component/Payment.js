import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";
import Notiflix from "notiflix-react";
import Headerusers from "./Header/Headerusers";

class Payment extends Component {
  state = {
    bank: {},
    data: [],
    totalharga: 0
  };

  componentDidMount() {
    // this.usebank();
    this.totalharga();
  }
  componentWillMount() {
    this.usebank();
  }

  uploadpayment = () => {
    const formData = new FormData();
    const datafoto = this.foto.files[0];
    formData.append("foto", datafoto);

    axios.patch(`/buktipembayaran/${this.props.userID}`, formData).then(res => {
      Notiflix.Report.Success("Upload Success", " ");
      console.log(datafoto);
    });
  };

  usebank = () => {
    axios.get(`/nullpay`).then(res => {
      this.setState({ bank: res.data });
    });
  };

  totalharga = () => {
    axios.get(`/totalharga/${this.props.userID}`).then(res => {
      this.setState({ totalharga: res.data.hasil });
    });
  };

  render() {
    console.log(this.state.bank);

    if (!this.state.bank)
      return (
        <React.Fragment>
          <Headerusers />
          <div
            className="col-6  mx-auto  jumbotron jumbotron-fluid"
            style={{ marginTop: "20px" }}
          >
            <div className="container ">
              <p class="text-center">transaction Pending</p>

              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Bank</th>
                    <th scope="col">No. Rek</th>
                    <th scope="col">Pending payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Wait Confirmaton</td>
                    <td>Wait Confirmaton</td>
                    <td>Wait Confirmaton</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <div className="col-6  mx-auto my-6 jumbotron jumbotron-fluid">
          <div className="container ">
            <p class="text-center">transaction Pending</p>

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Bank</th>
                  <th scope="col">No. Rek</th>
                  <th scope="col">Pending payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.bank.namabank}</td>
                  <td>{this.state.bank.norek}</td>
                  <td>Rp. {this.state.totalharga.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div>Mohon upload bukti pembayaran</div>
            <label htmlFor="Foto">Upload foto</label>
            <input
              type="file"
              className="form-control"
              id="Foto"
              name="foto"
              accept=".jpg, .jpeg, .png"
              placeholder="Upload dimari"
              ref={input => (this.foto = input)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary ml-3 mt-2 mb-5"
            onClick={this.uploadpayment}
          >
            Save
          </button>
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
