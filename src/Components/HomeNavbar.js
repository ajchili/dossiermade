import React, { Component } from "react";

const links = [
  { name: "ABOUT", url: "about" },
  { name: "WORK", url: "work" },
  { name: "SERVICES", url: "services" },
  { name: "CONTACT", url: "contact" }
];

class HomeNavbar extends Component {
  render() {
    return (
      <div>
        <div
          className="uk-visible@m"
          uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;"
        >
          <nav
            className="uk-navbar-container uk-navbar-secondary uk-light"
            uk-navbar="true"
          >
            <div className="uk-navbar-left uk-width-1-1 uk-background-secondary">
              <a
                href="#lander"
                className="uk-navbar-item uk-logo"
                uk-scroll="true"
              >
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
          </nav>
        </div>
        <div
          className="uk-hidden@m"
          uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;"
        >
          <nav className="uk-navbar-container uk-navbar-secondary uk-light">
            <div className="uk-navbar-left uk-background-secondary">
              <a
                className="uk-navbar-toggle"
                uk-toggle="target: #menu"
                uk-navbar-toggle-icon="true"
                href="#menu"
              >
                <span uk-navbar-toggle-icon="true" />
                <span className="uk-margin-small-left">DOSSIER MADE MEDIA</span>
              </a>
            </div>
          </nav>
        </div>
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
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {};

export default HomeNavbar;
