import React, { Component } from "react";
import Card from "./Card";
import Person from "../lib/Person";

interface State {
  people: Array<Person>;
}

class ContactCard extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      people: Person.getStaticPeople()
    };
  }

  async componentDidMount() {
    try {
      let people = await Person.getAll();
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
                  {person.phoneNumber && (
                    <a
                      href={`tel:1-${person.phoneNumber}`}
                      className="uk-link-reset"
                    >
                      <button className="uk-button uk-button-text">
                        {person.phoneNumber}
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
