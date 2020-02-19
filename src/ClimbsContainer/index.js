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
    const reversed = data.reverse();
    //reverse to have most recent climbs show up
    this.setState({ climbs: data });
  }

  render() {
    return (
      <ClimbList showClimb={this.props.showClimb} climbs={this.state.climbs} />
    );
  }
}

export default ClimbsContainer;
