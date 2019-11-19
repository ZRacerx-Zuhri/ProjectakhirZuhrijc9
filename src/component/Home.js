import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import Headerusers from "../component/Header/Headerusers";
import Notiflix from "notiflix-react";
import axios from "../config/axios";

class Home extends Component {
  state = {
    product: []
  };

  componentDidMount() {
    Notiflix.Loading.Circle("Please wait...");
    Notiflix.Loading.Remove(1000);
    this.getproduct();
  }

  getproduct = () => {
    axios
      .get("/product")
      .then(res => {
        this.setState({ product: res.data, searchP: res.data });
        console.log(this.state.product);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderlist = () => {
    return this.state.product.map(val => (
      <div
        key={val.id}
        className="card  m-5 d-flex justify-content-center"
        style={{ width: "18rem" }}
      >
        <div
          className="carousel slide"
          data-ride="carousel"
          data-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={`http://localhost:2004/productimg/${val.picture}`}
                alt="1"
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={`http://localhost:2004/productimg/${val.picture2}`}
                alt="2"
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={`http://localhost:2004/productimg/${val.picture3}`}
                alt="3"
                style={{ height: "200px" }}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{val.productname}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Rp. {val.price.toLocaleString()}
            </li>
            <li className="list-group-item">{val.deskripsi}</li>
            <li className="list-group-item">{val.lokasi}</li>
          </ul>
          <br></br>
          <Link to={`/detailproduct/${val.id}`}>
            <button className="btn btn-outline-primary btn-block">
              Details
            </button>
          </Link>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <React.Fragment>
        <Headerusers />

        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide backhome"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-interval="10000">
              <img
                src={require("../picture/background-01.jpg")}
                className="d-block w-100 heightcaro"
                alt="1"
              />
            </div>
            <div className="carousel-item " data-interval="10000">
              <img
                src={require("../picture/background-02.jpg")}
                className="d-block w-100 heightcaro"
                alt="2"
              />
            </div>
            <div className="carousel-item " data-interval="10000">
              <img
                src={require("../picture/background-03.jpeg")}
                className="d-block w-100 heightcaro"
                alt="3"
              />
            </div>
          </div>
        </div>

        <div className="homepro">
          <div className="homevenue">Our Venues</div>
          <div className="row col-10 mx-auto mt-5">{this.renderlist()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
