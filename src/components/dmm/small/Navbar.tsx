import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <nav className="uk-navbar-container uk-navbar-secondary uk-light">
        <div className="uk-navbar-left uk-background-secondary">
          <a
            className="uk-navbar-toggle"
            uk-toggle="target: #menu"
            href="#menu"
          >
            <span uk-navbar-toggle-icon="true" />
            <span className="uk-margin-small-left">DOSSIER MADE MEDIA</span>
          </a>
        </div>
      </nav>
    );
  }
}
