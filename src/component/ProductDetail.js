import React, { Component } from "react";
import Headerusers from "./Header/Headerusers";
import axios from "../config/axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Notiflix from "notiflix-react";

class ProductDetail extends Component {
  state = {
    product: {},
    jadwal: [],
    filterdate: [],
    time: [],
    Redirect: false
  };

  todatacart = () => {
    if (!this.props.userID)
      return Notiflix.Report.Failure("Please login to use this fiture", " ");
    if (this.edtanggal.value === "" || this.state.time.length === 0)
      return Notiflix.Report.Failure("Please fill Data", " ");

    for (let i = 0; i < this.state.time.length; i++) {
      axios
        .post(`/cart/${this.state.product.id}`, {
          tanggal: this.edtanggal.value,
          jam: this.state.time[i]
        })
        .then(res => {
          if (res.data.length > 0) {
            Notiflix.Report.Success("Save To Cart", " ");
          } else {
            axios
              .post("/addtocart", {
                userID: this.props.userID,
                productID: this.state.product.id,
                tanggal: this.edtanggal.value,
                jam: this.state.time[i]
              })
              .then(result => {
                Notiflix.Report.Success("Save To Cart", " ");
                this.setState({ Redirect: true });
              });
          }
        });
    }
  };

  inputjam = e => {
    const timeup = this.state.time;
    if (e.target.checked) {
      timeup.push(e.target.value);
    } else {
      let index = timeup.indexOf(e.target.value);
      timeup.splice(index, 1);
    }
    this.setState({ time: timeup });
    console.log(this.state.time);
  };

  componentDidMount() {
    this.getproduct();
    this.getjadwal();
  }

  getproduct = () => {
    let proid = this.props.match.params.id;

    axios(`/product/${proid}`).then(res => {
      this.setState({ product: res.data });
    });
  };

  hidedate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0 index | getMonth = 0-11 index
    var yyyy = today.getFullYear();
    // Desired output : min = "2019-08-23"

    // console.log(`${yyyy}-${mm}-${dd}`)  // Problem : "2019-8-22"
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    // console.log(`${yyyy}-${mm}-${dd}`)

    return `${yyyy}-${mm}-${dd}`; // Solved : 2019-08-22
  };

  getjadwal = () => {
    let proID = this.props.match.params.id;
    axios.get(`/productjadwal/${proID}`).then(res => {
      this.setState({ jadwal: res.data });
    });
  };

  filterjam = () => {
    const Tanggal = this.edtanggal.value;

    var hasil = this.state.jadwal.filter(val => val.date.includes(Tanggal));
    this.setState({ filterdate: hasil });
  };

  render() {
    if (this.state.Redirect === true) return <Redirect to="/cart" />;
    return (
      <React.Fragment>
        <Headerusers />
        <div className="col-7 mx-auto" style={{ marginTop: "10%" }}>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="3"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={`http://localhost:2004/productimg/${this.state.product.picture}`}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={`http://localhost:2004/productimg/${this.state.product.picture2}`}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={`http://localhost:2004/productimg/${this.state.product.picture3}`}
                  alt="Third slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={`http://localhost:2004/productimg/${this.state.product.picture4}`}
                  alt="Four slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="jadwal-tab"
                data-toggle="tab"
                href="#jadwal"
                role="tab"
                aria-controls="jadwal"
                aria-selected="true"
              >
                Schedule
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="deskripsi-tab"
                data-toggle="tab"
                href="#deskripsi"
                role="tab"
                aria-controls="deskripsi"
                aria-selected="false"
              >
                Deskripsi
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="lokasi-tab"
                data-toggle="tab"
                href="#lokasi"
                role="tab"
                aria-controls="lokasi"
                aria-selected="false"
              >
                Lokasi
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="jadwal"
              role="tabpanel"
              aria-labelledby="jadwal-tab"
            >
              <h5>Find Date</h5>
              <div className="input-group mb-5">
                <div className="input-group-prepend"></div>
                <input
                  min={this.hidedate()}
                  type="date"
                  className="form-control"
                  ref={input => (this.edtanggal = input)}
                  onChange={this.filterjam}
                  defaultValue={this.hidedate()}
                />
              </div>
              <div>
                {this.state.filterdate.map(list => {
                  return (
                    <div className="container row col-8" key={list}>
                      <div className="form-check d-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={list.time}
                          onChange={this.inputjam}
                        />
                        <div className=" d-inline">{list.time}</div>
                      </div>

                      <div
                        className="col  d-flex justify-content-end"
                        style={{ width: "30%" }}
                      >
                        Harga Rp.{list.price.toLocaleString()}/Jam
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="deskripsi"
              role="tabpanel"
              aria-labelledby="deskripsi-tab"
            >
              {this.state.product.deskripsi}
            </div>
            <div
              className="tab-pane fade"
              id="lokasi"
              role="tabpanel"
              aria-labelledby="lokasi-tab"
            >
              {this.state.product.lokasi}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mt-5 mb-5"
              onClick={this.todatacart}
            >
              Booking
            </button>
          </div>
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

export default connect(mps)(ProductDetail);
