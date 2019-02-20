import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { validateUserPermissions } from "../Components/firebase";
import Navbar from "../Components/AdminDashboardNavbar";

class AdminDashboard extends Component {
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
          <div className="uk-padding">
            <div className="uk-card uk-card-default uk-card-body uk-width-1-2@s">
              <ul className="uk-nav uk-nav-default">
                <li className="uk-nav-divider" />
                <li>
                  <Link to="/dashboard/edit/contact-information">
                    Contact Information
                  </Link>
                </li>
                <li className="uk-nav-divider" />
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AdminDashboard);
