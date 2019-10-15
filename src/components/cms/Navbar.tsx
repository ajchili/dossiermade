import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import firebase from "../../lib/firebase";

interface Props extends RouteComponentProps {}

class Navbar extends Component<Props, {}> {
  _logout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
        <nav className="uk-navbar-container" uk-navbar="true">
          <div className="uk-navbar-left">
            <Link to="/dashboard" className="uk-navbar-item uk-logo">
              DOSSIER MADE MEDIA - CMS
            </Link>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <a href="#logout" onClick={this._logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
