import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./index.css";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      grade: "",
      location: "",
      date: "",
      picture: "",
      thoughts: "",
      rating: 0
    };
  }

  componentDidMount() {
    if (this.props.climb !== null) this.setState({ ...this.props.climb });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.formType === "editClimb") {
      this.props.updateClimb(this.state);
    } else {
      this.props.createClimb(this.state);
    }
  };
  render() {
    return (
      <>
        <div className="form-container">
          <div>
            <Form onSubmit={this.handleSubmit} className="form" size="small">
              <Segment raised>
                <Form.Field>
                  <span className="title">
                    {this.props.formType === "editClimb" ? (
                      <h3>Edit Climb</h3>
                    ) : (
                      <h3>Add Climb</h3>
                    )}
                  </span>
                  <label>Climb Name</label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="enter climb name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Grade</label>
                  <input
                    name="grade"
                    value={this.state.grade}
                    onChange={this.handleChange}
                    placeholder="enter climb grade"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Location</label>
                  <input
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                    placeholder="enter location"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Thoughts</label>
                  <input
                    name="thoughts"
                    value={this.state.thoughts}
                    onChange={this.handleChange}
                    placeholder="enter thoughts"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Picture</label>
                  <input
                    name="picture"
                    value={this.state.picture}
                    onChange={this.handleChange}
                    placeholder="enter picture url"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Rating</label>

                  <select
                    name="rating"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>Date Climbed</label>
                  <input
                    name="date"
                    type="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    placeholder="enter date"
                  />
                </Form.Field>

                <div className="submit">
                  <Link to="/">
                    <Button>Submit</Button>
                  </Link>
                </div>
              </Segment>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default AuthForm;
