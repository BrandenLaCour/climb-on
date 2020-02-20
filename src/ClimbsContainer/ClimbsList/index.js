import React from "react";
import ClimbCard from "./ClimbCard";
import "./index.css";

const ClimbList = props => {
  return (
    <div className="content-container">
      <div className="content">
        {props.climbs.length > 0 ? (
          props.climbs.map(climb => {
            return (
              <React.Fragment key={climb.id}>
                <ClimbCard
                  deleteClimb={props.deleteClimb}
                  showClimb={props.showClimb}
                  editClimb={props.editClimb}
                  username={props.username}
                  id={climb.id}
                  climb={climb}
                />
              </React.Fragment>
            );
          })
        ) : (
          <div id="empty">
            <h2>No Climbs, Add a Climb!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClimbList;
