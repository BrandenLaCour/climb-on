import React from "react";
import ClimbCard from "./ClimbCard";
import "./index.css";

const ClimbList = props => {
  return (
    <div className="content-container">
      <div className="content">
        {props.climbs.map(climb => {
          return (
            <React.Fragment key={climb.id}>
              <ClimbCard
                showClimb={props.showClimb}
                id={climb.id}
                climb={climb}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ClimbList;
