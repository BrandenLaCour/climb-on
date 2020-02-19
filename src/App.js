import React, { Component } from "react";
import ClimbsContainer from "./ClimbsContainer";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
//can add redirect above if needed
import NavContainer from "./NavContainer";
// import SidebarContainer from "./SidebarContainer";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
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
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              vertical
              visible
            >
              <Link to="/">
                <Menu.Item as="a">
                  <Icon name="home" />
                  Home
                </Menu.Item>
              </Link>
              <Link to="/login">
                <Menu.Item as="a">
                  <Icon name="sign-in" />
                  Login
                </Menu.Item>
              </Link>
              <Link to="/logout">
                <Menu.Item as="a">
                  <Icon name="sign-out" />
                  Log Out
                </Menu.Item>
              </Link>
              <Link to="myClimbs">
                <Menu.Item as="a">
                  <Icon name="chart line" />
                  My Climbs
                </Menu.Item>
              </Link>
              <Link to="/Users">
                <Menu.Item as="a">
                  <Icon name="address book outline" />
                  Users
                </Menu.Item>
              </Link>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment content>
                <NavContainer />

                <Switch>
                  <Route exact path="/" render={props => <ClimbsContainer />} />
                </Switch>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
