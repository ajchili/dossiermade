import React, { Component } from "react";
import firebase from "../Components/firebase";
import Navbar from "../Components/AdminDashboardNavbar";

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default AdminDashboard;
