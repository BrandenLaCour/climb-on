import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./index.css";

const ClimbCard = props => {
  const stars = [];
  for (let i = 0; i < props.climb.rating; i++) {
    stars.push("star");
  }

  return (
    <React.Fragment>
      <Card style={{ width: "400px" }}>
        <Image src={props.climb.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {props.climb.name} | {props.climb.grade}
          </Card.Header>
          <Card.Meta>{props.climb.date}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            {" "}
            Rating:{" "}
            {stars.map((star, i) => {
              return <Icon key={i} name={star} color="blue" />;
            })}{" "}
            <Link onClick={() => props.showClimb(props.climb)} to="/showClimb">
              More Info
            </Link>
          </Card.Meta>
          <div className="button-container">
            <Link to="editClimb" onClick={() => props.editClimb(props.climb)}>
              {props.username === props.climb.user.username ? (
                <div>
                  {" "}
                  <Button>Edit Climb</Button>
                </div>
              ) : (
                ""
              )}
            </Link>
            <Link to="/" onClick={() => props.deleteClimb(props.climb.id)}>
              {props.username === props.climb.user.username ? (
                <div>
                  <Button>Delete Climb</Button>
                </div>
              ) : (
                ""
              )}
            </Link>
          </div>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

export default ClimbCard;
