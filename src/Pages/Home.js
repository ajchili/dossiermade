import React, { Component } from "react";
import Lander from "../Components/HomeLander";
import Navbar from "../Components/HomeNavbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Lander id="lander" />
        <Navbar />
      </div>
    );
  }
}

export default Home;
