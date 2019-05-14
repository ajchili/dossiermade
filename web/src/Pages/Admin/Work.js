import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../../Components/AdminDashboardNavbar";

class Work extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default withRouter(Work);
