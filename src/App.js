import React, { Component } from "react";
import ClimbsContainer from "./ClimbsContainer";
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
        <ClimbsContainer />
      </div>
    );
  }
}

export default App;
