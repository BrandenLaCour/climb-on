import React from "react";
import ClimbList from "./ClimbsList";

class ClimbsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      climbs: []
    };
  }

  async componentDidMount() {
    const climbsResponse = await fetch(
      process.env.REACT_APP_API_URI + "/api/v1/climbs/all"
    );
    const { data } = await climbsResponse.json();
    this.setState({ climbs: data });
  }

  render() {
    return <ClimbList climbs={this.state.climbs} />;
  }
}

export default ClimbsContainer;
