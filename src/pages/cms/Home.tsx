import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import firebase, { validateUserPermissions } from "../../lib/firebase";
import Card from "../../components/Card";
import Navbar from "../../components/cms/Navbar";

export interface Props extends RouteComponentProps { }

class Home extends Component<Props> {
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
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
