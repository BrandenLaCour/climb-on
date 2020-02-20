import React, { Component } from "react";
import ClimbsContainer from "./ClimbsContainer";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
//can add redirect above if needed
import NavContainer from "./NavContainer";
import AuthForm from "./AuthContainer/AuthForm";
import ClimbForm from "./ClimbsContainer/ClimbForm";
import ShowClimb from "./ClimbsContainer/ShowClimb";
import UsersContainer from "./UsersContainer";
// import SidebarContainer from "./SidebarContainer";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      userId: "",
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

  componentDidUpdate() {
    if (this.state.climb !== null && this.state.page !== "editClimb") {
      this.setState({ climb: null });
    }
  }

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
        this.setState({
          username: registerJson.data.username,
          userId: registerJson.data.id
        });
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
        this.setState({
          username: loginJson.data.username,
          userId: loginJson.data.id
        });
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
      this.setState({ username: "", userId: "" });
    } catch (err) {
      console.error(err);
    }
  };

  createClimb = async climbInfo => {
    delete climbInfo.redirect;
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

      const climbs = this.state.climbs;
      climbInfo.user = createdJson.data.user.id;
      climbs.unshift(createdJson.data);
      this.setState({ climbs: climbs });
    } catch (err) {
      console.error(err);
    }
  };

  updateClimb = async climbInfo => {
    delete climbInfo.redirect;
    const userId = climbInfo.user.id;
    delete climbInfo.user;
    climbInfo.user = userId;
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
      const climbs = this.state.climbs;
      const indexOfClimb = climbs.findIndex(climb => climb.id == climbInfo.id);
      climbs.splice(indexOfClimb, 1, updatedJson.data);
      this.setState({ climbs: climbs });
      console.log("edit ran");
      console.log(updatedJson);
    } catch (err) {
      console.error(err);
    }
  };

  deleteClimb = async climbId => {
    try {
      const deleteResponse = await fetch(
        process.env.REACT_APP_API_URI + "/api/v1/climbs/" + climbId,
        {
          credentials: "include",
          method: "DELETE"
        }
      );
      const deleteJson = await deleteResponse.json();
      const climbs = this.state.climbs;
      const indexOfClimb = climbs.findIndex(climb => climb.id === climbId);
      climbs.splice(indexOfClimb, 1);
      this.setState({ climbs: climbs });
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

              {this.state.username !== "" ? (
                <Menu.Item onClick={this.logout}>
                  <Icon name="sign-out" />
                  Log Out
                </Menu.Item>
              ) : null}

              <Link
                onClick={() => this.handlePageChoice("myClimbs")}
                to="/myClimbs"
              >
                <Menu.Item>
                  <Icon name="chart line" />
                  My Climbs
                </Menu.Item>
              </Link>
              <Link onClick={() => this.handlePageChoice("users")} to="/users">
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
                        deleteClimb={this.deleteClimb}
                        climbs={this.state.climbs}
                        editClimb={this.editClimb}
                        showClimb={this.showClimb}
                        username={this.state.username}
                        page={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/myClimbs"
                    render={props => (
                      <ClimbsContainer
                        deleteClimb={this.deleteClimb}
                        climbs={this.state.climbs.filter(
                          climb => climb.user.id === this.state.userId
                        )}
                        editClimb={this.editClimb}
                        showClimb={this.showClimb}
                        username={this.state.username}
                        page={this.state.page}
                      />
                    )}
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
                        page={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/users"
                    render={props => (
                      <UsersContainer
                        showClimb={this.showClimb}
                        climbs={this.state.climbs}
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
                        page={this.state.page}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={props =>
                      this.state.username === "" ? (
                        <AuthForm
                          climbs={this.state.climbs}
                          username={this.state.username}
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
