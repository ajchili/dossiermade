import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase, { validateUserPermissions } from "../../Components/firebase";
import EditableContactCard from "../../Components/EditableContactCard";
import Navbar from "../../Components/AdminDashboardNavbar";

class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseAuthListener: null,
      people: []
    };
  }

  componentDidMount() {
    const { history } = this.props;
    let firebaseAuthListener = firebase
      .auth()
      .onAuthStateChanged(async user => {
        if (user) {
          try {
            let valid = await validateUserPermissions();
            if (!valid) {
              throw new Error("Insufficient Permissions!");
            }
            this._loadPeople();
          } catch (err) {
            // Ignore error and redirect
            history.push("/login");
          }
        } else {
          history.push("/login");
        }
      });
    this.setState({ firebaseAuthListener });
  }

  componentWillUnmount() {
    const { firebaseAuthListener } = this.state;
    firebaseAuthListener();
  }

  _loadPeople = async () => {
    try {
      let query = await firebase
        .firestore()
        .collection("contact-information")
        .get();
      let people = query.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
          isEditing: false
        };
      });
      this.setState({ people });
    } catch (err) {
      // TODO: Hanle Error
    }
  };

  _createPerson = async () => {
    const { people } = this.state;
    try {
      let person = {
        name: "",
        email: "info@dossiermade.com",
        phone: ""
      };
      let doc = await firebase
        .firestore()
        .collection("contact-information")
        .add(person);
      person.id = doc.id;
      person.isEditing = true;
      people.push(person);
      this.setState({ people });
    } catch (err) {
      // TODO: Handle Error
    }
  };

  _deletePerson = async id => {
    const { people } = this.state;
    const { confirm } = window;
    let person = people.find(person => person.id === id);
    if (!person) return;
    else if (!confirm(`Are you sure that you want to delete ${person.name}?`)) {
      return;
    }
    try {
      await firebase
        .firestore()
        .collection("contact-information")
        .doc(id)
        .delete();
      this.setState({
        people: people.filter(person => person.id !== id)
      });
    } catch (err) {
      // TODO: Handle Error
    }
  };

  _savePerson = async (id, newInformation) => {
    const { people } = this.state;
    let person = people.find(person => person.id === id);
    if (!person) return;
    try {
      await firebase
        .firestore()
        .collection("contact-information")
        .doc(id)
        .set(newInformation);
      Object.keys(newInformation).forEach(key => {
        person[key] = newInformation[key];
      });
      person.isEditing = false;
      this.setState({ people });
    } catch (err) {
      // TODO: Handle Error
    }
  };

  render() {
    const { people } = this.state;
    return (
      <div>
        <Navbar />
        <button
          className="uk-button uk-margin-top uk-margin-left"
          onClick={this._createPerson}
        >
          Add
        </button>
        {people.map(person => {
          return (
            <EditableContactCard
              key={person.id}
              name={person.name}
              emailAddress={person.email}
              phoneNumber={person.phone}
              isEditing={person.isEditing}
              onEdit={() => {
                person.isEditing = true;
                this.setState({ people });
              }}
              onDelete={() => this._deletePerson(person.id)}
              onCancelEditing={() => {
                person.isEditing = false;
                this.setState({ people });
              }}
              onSave={(name, email, phone) => {
                this._savePerson(person.id, { name, email, phone });
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default withRouter(ContactInformation);
