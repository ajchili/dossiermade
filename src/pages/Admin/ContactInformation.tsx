import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import firebase, { validateUserPermissions } from "../../lib/firebase";
import Person, { PersonSnapshot } from "../../lib/Person";
import EditableContactCard from "../../components/EditableContactCard";
import Navbar from "../../components/AdminDashboardNavbar";

export interface Props extends RouteComponentProps {}

interface State {
  firebaseAuthListener: firebase.Unsubscribe | null;
  people: Array<Person>;
  peopleBeingEdited: Array<string>;
}

class ContactInformation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firebaseAuthListener: null,
      people: [],
      peopleBeingEdited: []
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
    if (firebaseAuthListener) {
      firebaseAuthListener();
    }
  }

  _loadPeople = async () => {
    try {
      let people = await Person.getAll();
      this.setState({ people });
    } catch (err) {
      // TODO: Hanle Error
      console.error(err);
    }
  };

  _createPerson = async () => {
    const { people } = this.state;
    try {
      let defaultData: PersonSnapshot = {
        name: "",
        email: "info@dossiermade.com",
        phoneNumber: ""
      };
      let person = await Person.create(defaultData);
      people.push(person);
      this.setState({ people });
    } catch (err) {
      // TODO: Handle Error
      console.error(err);
    }
  };

  _deletePerson = async (id: string) => {
    const { people } = this.state;
    const { confirm } = window;
    let person = people.find(person => person.id === id);
    if (!person) return;
    else if (!confirm(`Are you sure that you want to delete ${person.name}?`)) {
      return;
    }
    try {
      await person.delete();
      this.setState({
        people: people.filter(person => person.id !== id)
      });
    } catch (err) {
      // TODO: Handle Error
      console.error(err);
    }
  };

  _savePerson = async (id: string, newInformation: PersonSnapshot) => {
    const { people, peopleBeingEdited } = this.state;
    let person = people.find(person => person.id === id);
    if (!person) return;
    try {
      await person.update(newInformation);
      this.setState({
        people,
        peopleBeingEdited: peopleBeingEdited.filter(id => id !== person!.id)
      });
    } catch (err) {
      // TODO: Handle Error
      console.error(err);
    }
  };

  render() {
    const { people, peopleBeingEdited } = this.state;
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
              person={person}
              isEditing={peopleBeingEdited.includes(person.id)}
              onEdit={() => {
                peopleBeingEdited.push(person.id);
                this.setState({ peopleBeingEdited });
              }}
              onDelete={() => this._deletePerson(person.id)}
              onCancelEditing={() => {
                this.setState({
                  peopleBeingEdited: peopleBeingEdited.filter(
                    id => id !== person.id
                  )
                });
              }}
              onSave={(name?: string, email?: string, phoneNumber?: string) => {
                this._savePerson(person.id, { name, email, phoneNumber });
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default withRouter(ContactInformation);
