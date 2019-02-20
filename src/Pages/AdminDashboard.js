import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { validateUserPermissions } from "../Components/firebase";
import Navbar from "../Components/AdminDashboardNavbar";

class AdminDashboard extends Component {
  async componentDidMount() {
    const { history } = this.props;
    let valid = await validateUserPermissions();
    if (!valid) {
      alert("Insufficient Permissions");
      history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default withRouter(AdminDashboard);
