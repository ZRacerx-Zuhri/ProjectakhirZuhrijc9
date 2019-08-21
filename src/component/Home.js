import React, { Component } from "react";
import background from "../picture/home3.jpg";
import "../style.css";
import Headerusers from "../component/Header/Headerusers";
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Headerusers />
        <div
          style={{
            backgroundImage: `url(${background})`,
            width: `100%`,
            height: `1000px`
          }}
        >
          <h1 className="text">HOME</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
