import React, { Component } from "react";
import Headerusers from "./Header/Headerusers";
import axios from "../config/axios";
import { Link } from "react-router-dom";

class ProductCategory extends Component {
  state = {
    product: []
  };

  componentDidMount() {
    this.getproduct();
  }
  async componentWillUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      await this.getProducts2(prevProps.match.params.name);
    }
  }

  getProducts2 = async name => {
    try {
      const res = await axios.get(`/product-category/${name}`);
      this.setState({ product: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  getproduct = () => {
    axios
      .get(`/product-category/${this.props.match.params.name}`)
      .then(res => {
        this.setState({ product: res.data });
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
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={`http://localhost:2004/productimg/${val.picture2}`}
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={`http://localhost:2004/productimg/${val.picture3}`}
                alt=""
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
    console.log(this.state.product);
    return (
      <React.Fragment>
        <Headerusers />
        <div className="row col-10 mx-auto mt-5">{this.renderlist()}</div>
      </React.Fragment>
    );
  }
}

export default ProductCategory;
