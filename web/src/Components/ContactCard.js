import React, { Component } from "react";
import firebase from "../lib/firebase";
import Card from "./Card";

const staticPeople = [
  {
    name: "Kirin Patel",
    email: "info@dossiermade.com",
    phone: "301-641-5838"
  },
  {
    name: "Elijah Cutler",
    email: "info@dossiermade.com",
    phone: "410-402-3011"
  }
];

class ContactCard extends Component {
  state = {
    people: staticPeople
  };

  async componentDidMount() {
    try {
      let querySnapshot = await firebase
        .firestore()
        .collection("contact-information")
        .get();
      let people = querySnapshot.docs.map(doc => doc.data());
      this.setState({ people });
    } catch (err) {
      // Do nothing on error
    }
  }

  render() {
    const { people } = this.state;
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
