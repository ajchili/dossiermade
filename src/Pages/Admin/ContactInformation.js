import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import firebase, { validateUserPermissions } from "../../Components/firebase";
import EditableContactCard from "../../Components/EditableContactCard";
import Navbar from "../../Components/AdminDashboardNavbar";

class ContactInformation extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <EditableContactCard />
      </div>
    );
  }
}

export default withRouter(ContactInformation);
