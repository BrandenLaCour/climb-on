import React from "react";
import UserCard from "./UserCard";
import UserProfile from "./UserProfile";

class UsersContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      profileView: false,
      user: {}
    };
  }

  async componentDidMount() {
    const usersResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/users/all"
    );
    const usersJson = await usersResponse.json();
    this.setState({ users: usersJson.data });
  }

  componentDidUpdate() {
    if (this.state.profileView === true) {
      this.setState({ profileView: false });
    }
  }

  handleProfileView = userInfo => {
    const profileView = !this.state.profileView;

    this.setState({ profileView: profileView, user: userInfo });
  };
  render() {
    return (
      <>
        <div className="content-container">
          <div>
            {this.state.profileView ? (
              <UserProfile
                showClimb={this.props.showClimb}
                user={this.state.user}
                climbs={this.props.climbs}
              />
            ) : (
              this.state.users.map(user => {
                return (
                  <UserCard
                    handleProfileView={this.handleProfileView}
                    climbs={this.props.climbs}
                    user={user}
                  />
                );
              })
            )}
          </div>
        </div>
      </>
    );
  }
}

export default UsersContainer;
