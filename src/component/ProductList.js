import React, { Component } from "react";
import Headerusers from "./Header/Headerusers";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../src/style.css";

class ProductList extends Component {
  state = {
    product: [],
    searchP: []
  };

  componentDidMount() {
    this.getproduct();
    this.onSearch();
  }

  getproduct = () => {
    axios
      .get("/product")
      .then(res => {
        this.setState({ product: res.data, searchP: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSearch = () => {
    if (this.props.cari) {
      let arrSearch = this.state.searchP.filter(item => {
        return item.productname.toLowerCase().includes(this.props.cari);
      });
      this.setState({ product: arrSearch });
    }
  };

  renderlist = produc => {
    return produc.map(val => (
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
            <div className="carousel-item active ">
              <img
                className="d-block w-100 "
                src={`http://localhost:2004/productimg/${val.picture}`}
                alt="1"
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 "
                src={`http://localhost:2004/productimg/${val.picture2}`}
                alt="2"
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 "
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
    console.log(this.props.cari.search);
    let produc = this.state.product;
    if (this.props.cari) {
      produc = produc.filter(item => {
        return item.productname.toLowerCase().includes(this.props.cari.search);
      });
    }

    return (
      <React.Fragment>
        <Headerusers />
        <div className="row col-10 mx-auto mt-5">{this.renderlist(produc)}</div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    cari: state.search
  };
};
export default connect(mapStateToProps)(ProductList);
