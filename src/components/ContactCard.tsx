import React, { Component } from "react";
import Card from "./Card";

class ContactCard extends Component {
  render() {
    return (
      <Card
        title="CONTACT US"
        backgroundColor="dark"
        content={
          <div className="uk-column-width-1-1">
            <div className="uk-card uk-card-small uk-card-hover uk-card-body">
              <p className="uk-text-meta">
                <a
                  href="mailto:info@dossiermade.com"
                  className="uk-link-reset"
                >
                  <button className="uk-button uk-button-text">
                    info@dossiermade.com
                  </button>
                </a>
                <br />
                <a
                  href="tel:1-(410)-402-3011"
                  className="uk-link-reset"
                >
                  <button className="uk-button uk-button-text">
                    (410)-402-3011
                  </button>
                </a>
              </p>
            </ div>
          </ div>
        }
      />
    );
  }
}

export default ContactCard;
