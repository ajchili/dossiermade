import React, { Component, ComponentClass } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AdminDashboard from "../Pages/Admin/Home";
import AdminContactInformation from "../Pages/Admin/ContactInformation";
import AdminWork from "../Pages/Admin/Work";
import firebase from "../lib/firebase";

interface State {
  checkedAuthentication: boolean;
  user: firebase.User | null;
}

class Navigator extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      checkedAuthentication: false,
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      this.setState({ checkedAuthentication: true, user });
    });
  }

  render() {
    const { checkedAuthentication, user } = this.state;

    const authenticatedRoute = (Component: ComponentClass) =>
      user ? <Component /> : <Redirect to="/login" />;

    return (
      <Router>
        <Switch>
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
              path="/dashboard/contact"
              exact
              render={() => authenticatedRoute(AdminContactInformation)}
            />
          )}
          {checkedAuthentication && (
            <Route
              path="/dashboard/work"
              extact
              render={() => authenticatedRoute(AdminWork)}
            />
          )}
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default Navigator;
