import React, { Component } from "react";
import background from "../picture/home3.jpg";
import "../style.css";
import Headerusers from "../component/Header/Headerusers";
import Notiflix from "notiflix-react";
class Home extends Component {
  componentDidMount() {
    Notiflix.Loading.Circle("Please wait...");
    Notiflix.Loading.Remove(1000);
  }

  render() {
    return (
      <React.Fragment>
        <Headerusers />
        <div
          className="container col-12 mw-100 mh-100"
          style={{
            backgroundImage: `url(${background})`,
            height: "1000px",
            backgroundSize: "cover"
          }}
        >
          <h1 className="text"></h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
