import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase, { validateUserPermissions } from "../../Components/firebase";
import Card from "../../Components/Card";
import Navbar from "../../Components/AdminDashboardNavbar";

class Home extends Component {
  componentDidMount() {
    const { history } = this.props;
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          let valid = await validateUserPermissions();
          if (!valid) {
            throw new Error("Insufficient Permissions!");
          }
        } catch (err) {
          // Ignore error and redirect
          history.push("/login");
        }
      } else {
        history.push("/login");
      }
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Navbar />
        <div className="uk-container">
          <div className="uk-margin-top">
            <Card
              title="Work"
              content={
                <div>
                  <p>Manage content that is visible to website visitors.</p>
                  <button
                    className="uk-button uk-button-secondary"
                    onClick={() => history.push("/dashboard/work")}
                  >
                    Manage
                  </button>
                </div>
              }
              backgroundColor="dark"
            />
          </div>
          <div className="uk-margin-top">
            <Card
              title="Contact Information"
              content={
                <div>
                  <p>
                    Manage contact information that is presented to visitors.
                  </p>
                  <button
                    className="uk-button uk-button-secondary"
                    onClick={() => history.push("/dashboard/contact")}
                  >
                    Manage
                  </button>
                </div>
              }
              backgroundColor="dark"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
