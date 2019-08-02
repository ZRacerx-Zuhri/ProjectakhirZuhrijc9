import React, { Component } from "react";
import background from "../picture/home3.jpg";
import "../style.css";
class Home extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          width: `100%`,
          height: `1000px`
        }}
      >
        <h1 className="text">HOME</h1>
      </div>
    );
  }
}

export default Home;
