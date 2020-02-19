import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

const ClimbCard = props => {
  const stars = [];
  for (let i = 0; i < props.climb.rating; i++) {
    stars.push("star");
  }
  console.log(stars);
  return (
    <>
      <Card style={{ width: "400px" }}>
        <Image src={props.climb.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {props.climb.name} | {props.climb.grade}
          </Card.Header>
          <Card.Meta>{props.climb.date}</Card.Meta>
          <Card.Description>
            {props.climb.thoughts.slice(0, 65)}
          </Card.Description>
          <Card.Meta>{props.climb.user.username}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            {" "}
            Rating:{" "}
            {stars.map(star => {
              return <Icon name={star} color="blue" />;
            })}
          </Card.Meta>
        </Card.Content>
      </Card>
    </>
  );
};

export default ClimbCard;
