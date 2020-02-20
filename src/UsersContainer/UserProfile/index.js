import React from "react";
import { Card, Image } from "semantic-ui-react";
import "./index.css";
import { Link } from "react-router-dom";
import ClimbCard from "../../ClimbsContainer/ClimbsList/ClimbCard";

const UserProfile = props => {
  const climbs = props.climbs.filter(climb => climb.user.id === props.user.id);

  return (
    <React.Fragment>
      <div className="climb-container">
        <div>
          <Card style={{ width: "550px" }}>
            <Image src={props.user.picture} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{props.user.username}</Card.Header>
              <Card.Meta>{props.user.city}</Card.Meta>
            </Card.Content>
          </Card>
          {climbs.length > 0
            ? climbs.map(climb => {
                return (
                  <Card style={{ width: "250px" }}>
                    <Card.Content>
                      <Image floated="right" size="mini" src={climb.picture} />
                      <Card.Header>{climb.name}</Card.Header>
                      <Card.Meta>{climb.location}</Card.Meta>
                      <Card.Description>
                        <Link
                          onClick={() => props.showClimb(climb)}
                          to="/showClimb"
                          className="link"
                          style={{
                            marginLeft: "40px",
                            color: "blue",
                            textDecoration: "underline"
                          }}
                        >
                          More Info
                        </Link>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
