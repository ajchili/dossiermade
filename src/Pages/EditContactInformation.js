import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { validateUserPermissions } from "../Components/firebase";
import Navbar from "../Components/AdminDashboardNavbar";
import ContactEditor from "../Components/AdminDashboardContactEditor";

class EditContactInformation extends Component {
  state = { valid: false };

  async componentDidMount() {
    const { history } = this.props;
    let valid = await validateUserPermissions();
    if (!valid) {
      alert("Insufficient Permissions");
      return history.push("/");
    }
    this.setState({ valid: true });
  }

  render() {
    const { valid } = this.state;
    return (
      <div>
        <Navbar />
        {valid && (
          <div className="uk-light uk-padding">
            <ContactEditor />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditContactInformation);
