import React from "react";
import ClimbCard from "./ClimbCard";

const ClimbList = props => {
  return (
    <>
      {props.climbs.map(climb => {
        return <ClimbCard climb={climb} />;
      })}
    </>
  );
};

export default ClimbList;
