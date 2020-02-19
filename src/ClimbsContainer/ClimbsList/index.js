import React from "react";
import ClimbCard from "./ClimbCard";
import "./index.css";

const ClimbList = props => {
  return (
    <div className="content-container">
      <div className="content">
        {props.climbs.map(climb => {
          return <ClimbCard climb={climb} />;
        })}
      </div>
    </div>
  );
};

export default ClimbList;
