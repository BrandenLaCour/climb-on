import React from "react";

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
    return <p>Test</p>;
  }
}

export default ClimbsContainer;
