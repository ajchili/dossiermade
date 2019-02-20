import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase, { validateUserPermissions } from "../Components/firebase";

class AdminDashboardContactEditor extends Component {
  state = {
    loaded: false,
    people: []
  };

  async componentDidMount() {
    const { history } = this.props;
    let valid = await validateUserPermissions();
    if (valid) {
      this._loadContactInformation();
    } else {
      alert("Insufficient Permissions");
      return history.push("/");
    }
  }

  _loadContactInformation = async () => {
    try {
      let querySnapshot = await firebase
        .firestore()
        .collection("contact-information")
        .get();
      let people = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      this.setState({ loaded: true, people });
    } catch (err) {
      alert("Error loading contact information!");
      console.error(err);
    }
  };

  _addContactInformation = () => {};

  _editContactInformation = () => {};

  _deleteContactInformation = () => {};

  render() {
    const { loaded, people } = this.state;
    return (
      <div>
        <h1>
          Contact Information{" "}
          {loaded && (
            <button className="uk-button uk-button-default">Add</button>
          )}
        </h1>
        {loaded && <p>Click a card to begin editing</p>}
        <div
          className="uk-child-width-1-3 uk-grid-small uk-grid-match"
          uk-grid="true"
        >
          {people.map(person => (
            <div key={person.id}>
              <div className="uk-card uk-card-default uk-card-body">
                <p className="uk-card-title">{person.name}</p>
                <p>
                  {person.email}
                  <br />
                  {person.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(AdminDashboardContactEditor);
