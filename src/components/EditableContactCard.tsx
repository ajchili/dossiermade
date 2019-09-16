import React, { Component } from "react";
import Person from "../lib/Person";

export interface Props {
  person: Person;
  isEditing: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onCancelEditing?: () => void;
  onSave?: (name?: string, email?: string, phoneNumber?: string) => void;
}

interface State {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export default class EditableContactCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: props.person.name || "",
      email: props.person.email || "",
      phoneNumber: props.person.phoneNumber || ""
    };
  }

  _onValueChange = (key: "name" | "email" | "phoneNumber", value: string) => {
    let object: State = {};
    object[key] = value;
    this.setState(object);
  };

  render() {
    const {
      person,
      isEditing,
      onDelete = () => console.log("Delete action missing!"),
      onEdit = () => console.log("Edit action missing!"),
      onCancelEditing = () => console.log("Cancel edit action missing!"),
      onSave = () => console.log("Save action missing!")
    } = this.props;

    return (
      <div className="uk-card uk-card-body uk-card-default uk-margin-top uk-margin-left uk-margin-right">
        {!isEditing ? (
          <p className="uk-h1">{person.name}</p>
        ) : (
          <input
            className="uk-input"
            type="text"
            placeholder="Name"
            defaultValue={person.name}
            onChange={e => this._onValueChange("name", e.target.value)}
          />
        )}
        {!isEditing ? (
          <p className="uk-h4">
            {person.email}
            <br />
            {person.phoneNumber}
          </p>
        ) : (
          <div>
            <input
              className="uk-input uk-margin-top"
              type="email"
              placeholder="Email Address"
              defaultValue={person.email}
              onChange={e => this._onValueChange("email", e.target.value)}
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              placeholder="Phone Number"
              defaultValue={person.phoneNumber}
              onChange={e => this._onValueChange("phoneNumber", e.target.value)}
            />
          </div>
        )}
        {!isEditing ? (
          <div className="uk-margin-top" style={{ float: "right" }}>
            <button
              className="uk-button uk-button-danger uk-margin-right"
              onClick={onDelete}
            >
              Delete
            </button>
            <button className="uk-button uk-button-secondary" onClick={onEdit}>
              Edit
            </button>
          </div>
        ) : (
          <div className="uk-margin-top" style={{ float: "right" }}>
            <button
              className="uk-button uk-button-danger uk-margin-right"
              onClick={onCancelEditing}
            >
              Cancel
            </button>
            <button
              className="uk-button uk-button-secondary"
              onClick={() =>
                onSave(
                  this.state.name,
                  this.state.email,
                  this.state.phoneNumber
                )
              }
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}