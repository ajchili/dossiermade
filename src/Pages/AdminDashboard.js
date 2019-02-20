import React, { Component } from "react";
import firebase from "../Components/firebase";

class AdminDashboard extends Component {
  render() {
    return (
      <div id="container">
        <div>
          <h1>Admin Dashboard</h1>
        </div>
        <div>
          <div>
            <h2>Upload Media</h2>
          </div>
        </div>
        <div>
          <h2>Manage Content</h2>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
