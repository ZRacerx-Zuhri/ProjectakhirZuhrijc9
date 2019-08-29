import React, { Component } from "react";
import axios from "../../config/axios";
import Notiflix from "notiflix-react";
import HeaderAdmin from "../Header/HeaderAdmin";

class ManageProduct extends Component {
  state = {
    products: [],
    jadwal: []
  };

  getproduct = () => {
    axios
      .get("/productadmin")
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getJadwal = () => {
    return axios.get("/jadwal").then(res => {
      this.setState({ jadwal: res.data });
    });
  };

  componentDidMount() {
    this.getproduct();
    this.getJadwal();
  }

  onDelete = data => {
    return axios
      .delete(`/deleteproduct/${data}`)
      .then(res => {
        Notiflix.Report.Success("Product Deleted", " ");
        this.getproduct();
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderjadwal = () => {
    return this.state.jadwal.map(val => (
      <tr>
        <td scope="col">{val.productname}</td>
        <td scope="col">{val.lokasi}</td>
        <td scope="col">{val.date}</td>
        <td scope="col">{val.time}</td>
      </tr>
    ));
  };

  renderlist = () => {
    return this.state.products.map(item => (
      <tr>
        <td scope="col">{item.productname}</td>
        <td scope="col">{item.deskripsi}</td>
        <td scope="col">{item.price}</td>
        <td scope="col">{item.lokasi}</td>
        <td scope="col">{item.category}</td>
        <td scope="col" style={{ width: "20%", height: "40%" }}>
          <img
            src={`http://localhost:2004/productimg/${item.picture}`}
            style={{ width: "100%", height: "20%" }}
          />
        </td>
        <td>
          <button className="btn btn-primary mr-2">Edit</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              Notiflix.Confirm.Show(
                "Confirmation",
                "Are You Sure To Delete this product?",
                "Yes",
                "No",
                () => {
                  this.onDelete(item.id);
                },
                function() {
                  Notiflix.Report.Failure("Delete Failed", " ");
                }
              );
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  addProduct = () => {
    const formData = new FormData();

    const dataname = this.name.value;
    const datadesc = this.desc.value;
    const dataharga = this.harga.value;
    const datalokasi = this.lokasi.value;
    const datacategori = this.categori.value;

    for (let i = 0; i < this.pict.files.length; i++) {
      formData.append("picture", this.pict.files[i]);
    }

    formData.append("productname", dataname);
    formData.append("deskripsi", datadesc);
    formData.append("price", dataharga);
    formData.append("lokasi", datalokasi);
    formData.append("category", datacategori);

    axios
      .post("/input/product", formData)
      .then(res => {
        if (
          dataname === "" ||
          datadesc === "" ||
          dataharga < 0 ||
          datalokasi === "" ||
          datacategori === "" ||
          this.pict.files.length === 0 ||
          this.pict.files.length < 4
        )
          return Notiflix.Report.Failure("Data not completed", " ");
        Notiflix.Report.Success("Product Saved", " ");
        this.getproduct();
      })
      .catch(err => {
        console.log(err);
      });
  };

  addJadwal = () => {
    const tanggal = this.addtanggal.value;
    const jam = this.addjam.value;
    const productname = this.ADDproductname.value;

    if (tanggal === "" || jam === "" || productname === "")
      return Notiflix.Report.Failure("Data not completed", " ");
    axios.get(`/lapangan/${productname}`).then(res => {
      if (res.data.length < 1) {
        Notiflix.Report.Failure("Data not found", " ");
      } else {
        axios
          .post("/addjadwal", {
            tanggal: tanggal,
            jam: jam,
            productname: productname
          })
          .then(res => {
            Notiflix.Report.Success("Jadwal Added", " ");
          });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <HeaderAdmin />
        <div className="container">
          <h1 className="display-8 text-center">List Product</h1>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Harga</th>
                <th scope="col">Lokasi</th>
                <th scope="col">Category</th>
                <th scope="col">Gallery</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.renderlist()}</tbody>
          </table>
          <h1 className="display-8 text-center">Input Product</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Descrition</th>
                <th scope="col">Harga</th>
                <th scope="col">Lokasi</th>
                <th scope="col">Category</th>
                <th scope="col">Gallery</th>
                <th scope="col">ADD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">
                  <input
                    ref={input => (this.name = input)}
                    className="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.desc = input)}
                    className="form-control"
                    type="text"
                    placeholder="Description"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.harga = input)}
                    className="form-control"
                    type="number"
                    placeholder="Harga"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.lokasi = input)}
                    className="form-control"
                    type="text"
                    placeholder="Lokasi"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.categori = input)}
                    className="form-control"
                    type="text"
                    placeholder="Category"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.pict = input)}
                    className="form-control"
                    type="file"
                    name="picture"
                    multiple
                  />
                </th>
                <th scope="col">
                  <button
                    className="btn btn-primary "
                    onClick={this.addProduct}
                  >
                    Add
                  </button>
                </th>
              </tr>
            </tbody>
          </table>

          <div className="col-sm-6 mx-auto">
            <h1 className="display-8 text-center">Jadwal Product</h1>
            <table className="table table-hover mb-6">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Lokasi</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jam</th>
                </tr>
              </thead>
              <tbody>{this.renderjadwal()}</tbody>
            </table>
          </div>

          <div className="col-sm-10 mx-auto">
            <h1 className="display-8 text-center">Add Jadwal</h1>
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col-sm-4">Tanggal </th>
                  <th scope="col">Jam</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col-sm-4">
                    <input
                      ref={input => (this.addtanggal = input)}
                      className="form-control"
                      type="date"
                      placeholder="Tanggal"
                    />
                  </th>
                  <th scope="col">
                    <input
                      ref={input => (this.addjam = input)}
                      className="form-control"
                      type="time"
                      placeholder="Jam"
                    />
                  </th>
                  <th scope="col">
                    <input
                      ref={input => (this.ADDproductname = input)}
                      className="form-control"
                      type="text"
                      placeholder="ProductName"
                    />
                  </th>
                  <th scope="col ">
                    <button
                      className="btn btn-secondary"
                      onClick={this.addJadwal}
                    >
                      Add
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageProduct;
