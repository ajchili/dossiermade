import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase, { provider } from "../Components/firebase";

class Login extends Component {
  _googleSignIn = () => {
    const { history } = this.props;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async result => {
        const { user } = result;
        try {
          let documentSnapshot = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get();
          if (documentSnapshot.exists && documentSnapshot.data().admin) {
            history.push("/dashboard");
          } else {
            firebase.auth().signOut();
            alert("Insufficient Permissions");
            history.push("/");
          }
        } catch (err) {
          console.error(err);
        }
      })
      .catch(() => alert("An unexpected error occurred."));
  };

  render() {
    return (
      <div style={styles.fill}>
        <div style={styles.content}>
          <div style={styles.contentItems} className="uk-light uk-text-center">
            <h3>Administrator Login</h3>
            <button
              onClick={this._googleSignIn}
              className="uk-button uk-button-danger"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  fill: {
    width: "100%",
    height: "100vh"
  },
  content: {
    width: "100%",
    height: "100%",
    display: "table",
    position: "relative"
  },
  contentItems: {
    display: "table-cell",
    verticalAlign: "middle",
    mixBlendMode: "difference"
  }
};

export default withRouter(Login);
