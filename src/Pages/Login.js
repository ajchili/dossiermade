import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase, {
  provider,
  validateUserPermissions
} from "../Components/firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCheckedAuthentication: false
    };
  }

  componentDidMount() {
    const { history } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      const { hasCheckedAuthentication } = this.state;
      if (!hasCheckedAuthentication && user) {
        history.push("/dashboard");
      }
      this.setState({ hasCheckedAuthentication: true });
    });
  }

  _googleSignIn = () => {
    const { history } = this.props;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async () => {
        try {
          let valid = await validateUserPermissions();
          if (valid) {
            history.push("/dashboard");
          } else {
            alert("Insufficient Permissions");
            history.push("/");
          }
        } catch (err) {
          // Ignore error
        }
      })
      .catch(() => alert("An unexpected error occurred."));
  };

  _goBack = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <div style={styles.fill}>
        <div style={styles.content}>
          <div style={styles.contentItems} className="uk-light uk-text-center">
            <h3>Administrator Login</h3>
            <button
              onClick={this._googleSignIn}
              className="uk-button uk-button-secondary"
            >
              LOGIN
            </button>
            <br />
            <br />
            <button onClick={this._goBack} className="uk-button uk-button-text">
              BACK
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
