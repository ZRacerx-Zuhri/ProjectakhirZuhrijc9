import React, { Component } from "react";
import axios from "../config/axios";
import Headerusers from "./Header/Headerusers";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { decodedData } from "../picture/picture";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Orderdetail extends Component {
  state = {
    details: [],
    id: 0,
    total_harga: 0
  };

  componentDidMount() {
    this.detailorder();
  }

  detailorder = async () => {
    let res = await axios.get(`/orderdetail/${this.props.match.params.id}`);
    this.setState({ details: res.data });
    this.setState({ id: res.data[0].id });
    this.setState({ total_harga: res.data[0].total_harga });
  };

  renderDetail = () => {
    return this.state.details.map(val => (
      <tr>
        <td>{val.productname}</td>
        <td>{val.date}</td>
        <td>{val.time}</td>
        <td>Rp. {val.price.toLocaleString()}</td>
      </tr>
    ));
  };

  openpdf = () => {
    console.log(decodedData);
    var docDefinition = {
      content: [
        {
          image: `data:image/jpeg;base64,${decodedData}`
        }
      ]
    };

    console.log(docDefinition.content[0].image);

    pdfMake.createPdf(docDefinition).open();
  };

  render() {
    return (
      <React.Fragment>
        <Headerusers />
        <div
          className="col-6 mx-auto jumbotron jumbotron-fluid"
          style={{ marginTop: "10%", border: "solid" }}
        >
          <div className="container" style={{ border: "solid" }}>
            <p className="text-center">Details Order ID {this.state.id}</p>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Venue</th>
                  <th scope="col">tanggal </th>
                  <th scope="col">Jam</th>
                  <th scope="col">Harga/Jam</th>
                </tr>
              </thead>
              <tbody>{this.renderDetail()}</tbody>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Total</th>
                  <td scope="col">
                    Rp. {this.state.total_harga.toLocaleString()}
                  </td>
                </tr>
              </thead>
            </table>
          </div>

          <button className="mt-4" onClick={this.openpdf}>
            Open Pdf
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Orderdetail;
