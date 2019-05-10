import React, { Component } from "react";

export default class EditableContactCard extends Component {
  render() {
    const { name, emailAddress, phoneNumber, isEditing } = this.props;

    return (
      <div className="uk-card uk-card-body uk-card-default uk-margin-top uk-margin-left uk-margin-right">
        {!isEditing ? (
          <p className="uk-h1">{name}</p>
        ) : (
          <input className="uk-input" type="text" placeholder="Name" />
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
            />
            <input
              className="uk-input uk-margin-top"
              type="number"
              placeholder="Phone Number"
            />
          </div>
        )}
        {!isEditing ? (
          <button
            className="uk-button uk-button-secondary uk-margin-top"
            style={{ float: "right" }}
          >
            Edit
          </button>
        ) : (
          <div className="uk-margin-top" style={{ float: "right" }}>
            <button className="uk-button uk-button-danger uk-margin-right">
              Cancel
            </button>
            <button className="uk-button uk-button-secondary">Save</button>
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
