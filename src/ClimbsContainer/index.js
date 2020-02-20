import React from "react";
import ClimbList from "./ClimbsList";

const ClimbsContainer = props => {
  return (
    <ClimbList
      editClimb={props.editClimb}
      showClimb={props.showClimb}
      username={props.username}
      climbs={props.climbs}
    />
  );
};

export default ClimbsContainer;
