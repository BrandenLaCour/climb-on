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
      username: "",
      page: "home",
      climbToBeEdited: -1,
      climb: null,
      climbs: []
    };
  }
  // {
  //   "username": "branden",
  //   "email": "lacour@gmail.com",
  //   "password": "1234",
  //   "city": "chicago"
  // }

  async componentDidMount() {
    const climbsResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/climbs/all"
    );
    const { data } = await climbsResponse.json();
    const reversed = data.reverse();
    //reverse to have most recent climbs show up
    this.setState({ climbs: data });
  }

  handlePageChoice = page => {
    this.setState({ page: page });
  };

  register = async userInfo => {
    try {
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
      const registerJson = await registerResponse.json();
      console.log(registerJson);
      if (registerJson.message !== "username or email already exists") {
        this.setState({ username: registerJson.data.username });
      } else {
        console.log("username or email already exists");
      }
    } catch (err) {
      console.error(err);
    }
  };

  login = async userInfo => {
    try {
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
      const loginJson = await loginResponse.json();
      if (loginJson.message !== "username or password incorrect") {
        this.setState({ username: loginJson.data.username });
      } else {
        console.log("username or password incorrect");
      }
    } catch (err) {
      console.error(err);
    }
  };

  logout = async () => {
    try {
      const logoutResponse = await fetch(
        process.env.REACT_APP_API_URI + "/api/v1/users/logout"
      );
      const logoutJson = await logoutResponse.json();
      console.log(logoutJson);
      this.setState({ username: "" });
    } catch (err) {
      console.error(err);
    }
  };

  createClimb = async climbInfo => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  updateClimb = async climbInfo => {
    try {
      const updatedResponse = await fetch(
        process.env.REACT_APP_API_URI + "/api/v1/climbs/" + climbInfo.id,
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
    } catch (err) {
      console.error(err);
    }
  };

  showClimb = async climbInfo => {
    this.setState({ climb: climbInfo });
  };

  editClimb = climbInfo => {
    this.setState({ climb: climbInfo, page: "editClimb" });
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
              {this.state.username === "" ? (
                <Link onClick={() => this.handlePageChoice("login")} to="login">
                  <Menu.Item>
                    <Icon name="sign-in" />
                    Login
                  </Menu.Item>
                </Link>
              ) : null}

              <Menu.Item onClick={this.logout}>
                <Icon name="sign-out" />
                Log Out
              </Menu.Item>

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
                    render={props =>
                      this.state.climbs.length > 0 ? (
                        <ClimbsContainer
                          climbs={this.state.climbs}
                          editClimb={this.editClimb}
                          showClimb={this.showClimb}
                          username={this.state.username}
                          page={this.state.page}
                        />
                      ) : (
                        <AuthForm
                          handlePageChoice={this.handlePageChoice}
                          formType={this.state.page}
                          register={this.register}
                          login={this.login}
                        />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/showClimb"
                    render={props =>
                      this.state.climb !== null ? (
                        <ShowClimb climb={this.state.climb} />
                      ) : (
                        <Redirect to="/" />
                      )
                    }
                  />
                  }
                  <Route
                    exact
                    path="/addClimb"
                    render={props => (
                      <ClimbForm
                        climb={this.state.climb}
                        createClimb={this.createClimb}
                        formType={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/editClimb"
                    render={props => (
                      <ClimbForm
                        climb={this.state.climb}
                        createClimb={this.createClimb}
                        updateClimb={this.updateClimb}
                        formType={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={props =>
                      this.state.username === "" ? (
                        <AuthForm
                          handlePageChoice={this.handlePageChoice}
                          formType={this.state.page}
                          register={this.register}
                          login={this.login}
                        />
                      ) : (
                        <Redirect to="/" />
                      )
                    }
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
