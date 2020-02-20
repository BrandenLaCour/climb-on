import React from "react";
import UserCard from "./UserCard";

class UsersContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const usersResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/users/all"
    );
    const usersJson = await usersResponse.json();
    this.setState({ users: usersJson.data });
  }
  render() {
    return (
      <>
        <div className="content-container">
          <div>
            {this.state.users.map(user => {
              return <UserCard climbs={this.props.climbs} user={user} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default UsersContainer;
