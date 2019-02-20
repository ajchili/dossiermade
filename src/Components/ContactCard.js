import React, { Component } from "react";
import Card from "./Card";

const people = [
  {
    name: "Elijah Cutler",
    email: "elijah@dossiermade.com",
    phone: "410-402-3011"
  },
  {
    name: "Kirin Patel",
    email: "kirin@dossiermade.com",
    phone: "301-641-5838"
  }
];

class ContactCard extends Component {
  render() {
    return (
      <Card
        title="CONTACT US"
        backgroundColor="dark"
        content={
          <div className="uk-column-width-1-1">
            {people.map((person, i) => (
              <div
                key={i}
                className="uk-card uk-card-small uk-card-hover uk-card-body"
              >
                <p className="uk-card-title">{person.name}</p>
                <p className="uk-text-meta">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="uk-link-reset"
                    >
                      <button className="uk-button uk-button-text">
                        {person.email}
                      </button>
                    </a>
                  )}
                  <br />
                  {person.phone && (
                    <a href={`tel:1-${person.phone}`} className="uk-link-reset">
                      <button className="uk-button uk-button-text">
                        {person.phone}
                      </button>
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        }
      />
    );
  }
}

export default ContactCard;
