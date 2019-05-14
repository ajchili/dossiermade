import React, { Component } from "react";

export default class EditableContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || "",
      emailAddress: props.emailAddress || "",
      phoneNumber: props.phoneNumber || ""
    };
  }

  _onValueChange = (key, value) => {
    let object = {};
    object[key] = value;
    this.setState(object);
  };

  render() {
    const {
      name,
      emailAddress,
      phoneNumber,
      isEditing,
      onDelete = () => console.log("Delete action missing!"),
      onEdit = () => console.log("Edit action missing!"),
      onCancelEditing = () => console.log("Cancel edit action missing!"),
      onSave = () => console.log("Save action missing!")
    } = this.props;

    return (
      <div className="uk-card uk-card-body uk-card-default uk-margin-top uk-margin-left uk-margin-right">
        {!isEditing ? (
          <p className="uk-h1">{name}</p>
        ) : (
          <input
            className="uk-input"
            type="text"
            placeholder="Name"
            defaultValue={name}
            onChange={e => this._onValueChange("name", e.target.value)}
          />
        )}
        {!isEditing ? (
          <p className="uk-h4">
            {emailAddress}
            <br />
            {phoneNumber}
          </p>
        ) : (
          <div>
            <input
              className="uk-input uk-margin-top"
              type="email"
              placeholder="Email Address"
              defaultValue={emailAddress}
              onChange={e =>
                this._onValueChange("emailAddress", e.target.value)
              }
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              placeholder="Phone Number"
              defaultValue={phoneNumber}
              onChange={e =>
                this._onValueChange("phoneNumber", e.target.value)
              }
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
                  this.state.emailAddress,
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

EditableContactCard.defaultProps = {
  name: "Name",
  emailAddress: "info@dossiermade.com",
  phoneNumber: "+1 123-456-7890",
  isEditing: false
};
