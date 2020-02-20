import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "./index.css";

const ShowClimb = props => {
  const stars = [];
  for (let i = 0; i < props.climb.rating; i++) {
    stars.push("star");
  }
  return (
    <React.Fragment>
      <div className="climb-container">
        <div>
          <Card style={{ width: "550px" }}>
            <Image src={props.climb.picture} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                {props.climb.name} | {props.climb.grade}
              </Card.Header>
              <Card.Meta>{props.climb.date}</Card.Meta>
              <Card.Description>{props.climb.thoughts}</Card.Description>
              <Card.Meta>{props.climb.user.username}</Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Meta>
                {" "}
                Rating:{" "}
                {stars.map((star, i) => {
                  return <Icon key={i} name={star} color="blue" />;
                })}
              </Card.Meta>
            </Card.Content>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowClimb;
