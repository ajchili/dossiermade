import React, { Component } from "react";
import Menu from "./NavbarMenu";
import Medium from "./medium/Navbar";
import Small from "./small/Navbar";

export type Link = {
  name: string;
  url: string;
};

export interface Props {
  links: Array<Link>;
}

const links = [
  { name: "WORK", url: "work" },
  { name: "ABOUT", url: "about" },
  { name: "SERVICES", url: "services" },
  { name: "CONTACT", url: "contact" }
];

export default class extends Component {
  render() {
    return (
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
        <div className="uk-hidden@s">
          <Small />
          <Menu links={links} />
        </div>
        <div className="uk-visible@s">
          <Medium links={links} />
        </div>
      </div>
    );
  }
}
