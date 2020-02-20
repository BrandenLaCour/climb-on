import React from "react";
import { Card, Image } from "semantic-ui-react";

const UserCard = props => {
  const climbs = props.climbs.filter(climb => climb.id === props.user.id);
  return (
    <div>
      <Card style={{ width: "250px" }}>
        <Card.Content>
          <Image floated="right" size="mini" src={props.user.picture} />
          <Card.Header>{props.user.username}</Card.Header>
          <Card.Meta>{props.user.city}</Card.Meta>
          <Card.Description>
            climbs posted: {climbs.length}{" "}
            <span
              onClick={() => props.handleProfileView(props.user)}
              className="link"
              style={{
                marginLeft: "40px",
                color: "blue",
                textDecoration: "underline"
              }}
            >
              More Info
            </span>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserCard;
