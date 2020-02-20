import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
            <Link style={{ marginLeft: "40px" }}>More Info</Link>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserCard;
