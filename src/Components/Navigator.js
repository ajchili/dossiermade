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
import AdminDashboard from "../Pages/AdminDashboard";
import EditContactInformation from "../Pages/EditContactInformation";

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
    
    const authenticatedRoute = Component =>
      user ? <Component /> : <Redirect to="/login" />;

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          {checkedAuthentication && (
            <Route
              path="/dashboard"
              exact
              render={() => authenticatedRoute(AdminDashboard)}
            />
          )}
          {checkedAuthentication && (
            <Route
              path="/dashboard/edit/contact-information"
              exact
              render={() => authenticatedRoute(EditContactInformation)}
            />
          )}
        </Switch>
      </Router>
    );
  }
}

export default Navigator;
