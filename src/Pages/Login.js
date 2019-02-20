import React, { Component } from "react";
import firebase, { provider } from "../Components/firebase";

class Login extends Component {
  _googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };

  styles = {};

  render() {
    console.log(firebase);
    return (
      <div className="uk-container">
        <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-text-center">
          <h3 className="uk-card-title">Administrator Login</h3>
          <button
            onClick={this._googleSignIn}
            className="uk-button uk-button-danger"
          >
            LOGIN WITH GOOGLE
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
