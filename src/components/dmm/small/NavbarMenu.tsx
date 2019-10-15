import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Props } from "../Navbar";

export default class extends Component<Props> {
  render() {
    const { links } = this.props;

    return (
      <div id="menu" uk-offcanvas="true">
        <div className="uk-offcanvas-bar">
          <button
            className="uk-offcanvas-close"
            type="button"
            uk-close="true"
          />
          <ul className="uk-nav">
            <li>
              <a
                className="uk-navbar-toggle"
                uk-toggle="target: #menu"
                href="#lander"
                uk-scroll="true"
              >
                HOME
              </a>
            </li>
            {links.map((link, i) => (
              <li key={i}>
                <a
                  className="uk-navbar-toggle"
                  uk-toggle="target: #menu"
                  href={`#${link.url}`}
                  uk-scroll="true"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="uk-hidden@s">
              <Link
                to="/login"
                className="uk-navbar-toggle"
              >
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
