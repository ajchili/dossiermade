import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import firebase from "./firebase";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

class Navigator extends Component {
  state = {
    checkedAuthentication: false,
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ checkedAuthentication: true, user });
    });
  }

  render() {
    const { checkedAuthentication, user } = this.state;

    const redirectingAuthenticationRoute = Component =>
      user ? <Redirect to="/dashboard" /> : <Component />;

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {checkedAuthentication && (
            <Route
              path="/login"
              exact
              render={() => redirectingAuthenticationRoute(Login)}
            />
          )}
        </Switch>
      </Router>
    );
  }
}

export default Navigator;
