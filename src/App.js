import React, { Component } from "react";
import ClimbsContainer from "./ClimbsContainer";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import NavContainer from "./NavContainer";
import SidebarContainer from "./SidebarContainer";
//can add redirect above if needed
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: ""
    };
  }
  // {
  //   "username": "branden",
  //   "email": "lacour@gmail.com",
  //   "password": "1234",
  //   "city": "chicago"
  // }
  render() {
    return (
      <div>
        <BrowserRouter history basename="/">
          <NavContainer />
          <SidebarContainer />
          <Switch>
            <Route exact path="/" render={props => <ClimbsContainer />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
