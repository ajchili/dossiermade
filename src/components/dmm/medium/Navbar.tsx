import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Props } from "../Navbar";

export default class extends Component<Props> {
  render() {
    const { links } = this.props;

    return (
      <nav
        className="uk-navbar-container uk-navbar-secondary uk-light"
        uk-navbar="true"
      >
        <div className="uk-navbar-left uk-width-1-1 uk-background-secondary">
          <a href="#lander" className="uk-navbar-item uk-logo" uk-scroll="true">
            DOSSIER MADE MEDIA
          </a>
          <ul
            className="uk-navbar-nav"
            uk-scrollspy-nav="closest: li; scroll: true"
          >
            {links.map((link, i) => (
              <li key={i}>
                <a href={`#${link.url}`} uk-scroll="true">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="uk-navbar-right uk-background-secondary">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
