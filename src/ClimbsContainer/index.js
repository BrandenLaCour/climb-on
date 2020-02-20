import React from "react";
import ClimbList from "./ClimbsList";

const ClimbsContainer = props => {
  return (
    <ClimbList
      editClimb={this.props.editClimb}
      showClimb={this.props.showClimb}
      username={this.props.username}
      climbs={props.climbs}
    />
  );
};

export default ClimbsContainer;
