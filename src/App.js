import React, { Component } from "react";
import ClimbsContainer from "./ClimbsContainer";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
//can add redirect above if needed
import NavContainer from "./NavContainer";
import AuthForm from "./AuthContainer/AuthForm";
import ClimbForm from "./ClimbsContainer/ClimbForm";
import ShowClimb from "./ClimbsContainer/ShowClimb";
// import SidebarContainer from "./SidebarContainer";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "brandenlacour@gma",
      page: "home",
      climbToBeEdited: -1,
      climb: null
    };
  }
  // {
  //   "username": "branden",
  //   "email": "lacour@gmail.com",
  //   "password": "1234",
  //   "city": "chicago"
  // }

  handlePageChoice = page => {
    this.setState({ page: page });
  };

  register = async userInfo => {
    const registerResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/users/register",
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const { data } = await registerResponse.json();
    this.setState({ username: data.username });
  };

  login = async userInfo => {
    const loginResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/users/login",
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const { data } = await loginResponse.json();

    this.setState({ username: data.username });
  };

  createClimb = async climbInfo => {
    const createdResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/climbs/",
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(climbInfo),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const createdJson = await createdResponse.json();
  };

  updateClimb = async climbInfo => {
    const updatedResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/climbs/",
      {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(climbInfo),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const updatedJson = await updatedResponse.json();
  };

  showClimb = async climbInfo => {
    this.setState({ climb: climbInfo });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              vertical
              visible
            >
              <Link onClick={() => this.handlePageChoice("home")} to="/">
                <Menu.Item>
                  <Icon name="home" />
                  Home
                </Menu.Item>
              </Link>
              <Link onClick={() => this.handlePageChoice("login")} to="login">
                <Menu.Item>
                  <Icon name="sign-in" />
                  Login
                </Menu.Item>
              </Link>
              <Link
                onClick={() => this.handlePageChoice("logout")}
                to="/logout"
              >
                <Menu.Item>
                  <Icon name="sign-out" />
                  Log Out
                </Menu.Item>
              </Link>

              <Link
                onClick={() => this.handlePageChoice("myClimbs")}
                to="myClimbs"
              >
                <Menu.Item>
                  <Icon name="chart line" />
                  My Climbs
                </Menu.Item>
              </Link>
              <Link onClick={() => this.handlePageChoice("users")} to="/Users">
                <Menu.Item>
                  <Icon name="address book outline" />
                  Users
                </Menu.Item>
              </Link>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment
                style={
                  this.state.page !== ("home" || "users" || "my climbs")
                    ? { height: "100vh" }
                    : { height: "100%" }
                }
              >
                <NavContainer
                  username={this.state.username}
                  handlePageChoice={this.handlePageChoice}
                />

                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <ClimbsContainer
                        showClimb={this.showClimb}
                        page={this.state.page}
                      />
                    )}
                  />
                  {this.state.climb !== null ? (
                    <Route
                      exact
                      path="/showClimb"
                      render={props => <ShowClimb climb={this.state.climb} />}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
                  <Route
                    exact
                    path="/addClimb"
                    render={props => (
                      <ClimbForm
                        createClimb={this.createClimb}
                        updateClimb={this.updateClimb}
                        formType={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={props => (
                      <AuthForm
                        handlePageChoice={this.handlePageChoice}
                        formType={this.state.page}
                        register={this.register}
                        login={this.login}
                      />
                    )}
                  />
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
