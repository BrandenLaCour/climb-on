import React from "react";
import { Form, Segment, Button, Select } from "semantic-ui-react";
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

  onChange = event => {
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
    const ratingOptions = [
      { key: 1, value: 1, text: 1 },
      { key: 2, value: 2, text: 2 },
      { key: 3, value: 3, text: 3 },
      { key: 4, value: 4, text: 4 },
      { key: 5, value: 5, text: 5 }
    ];
    console.log(this.state);
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
                    onChange={this.onChange}
                    placeholder="enter climb name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Grade</label>
                  <input
                    name="grade"
                    value={this.state.grade}
                    onChange={this.onChange}
                    placeholder="enter climb grade"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Location</label>
                  <input
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    placeholder="enter location"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Thoughts</label>
                  <input
                    name="thoughts"
                    value={this.state.thoughts}
                    onChange={this.onChange}
                    placeholder="enter thoughts"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Picture</label>
                  <input
                    name="picture"
                    value={this.state.picture}
                    onChange={this.onChange}
                    placeholder="enter picture url"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Rating</label>
                  <Select
                    placeholder="Rate The Climb"
                    name="rating"
                    value={this.state.value}
                    onChange={this.onChange}
                    options={ratingOptions}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Date Climbed</label>
                  <input
                    name="date"
                    type="date"
                    value={this.state.date}
                    onChange={this.onChange}
                    placeholder="enter date"
                  />
                </Form.Field>

                <div className="submit">
                  <Button>Submit</Button>
                </div>
                <div className="form-subtitle">
                  <small>
                    {this.props.formType === "register"
                      ? "Already Registered? "
                      : "Need to Register? "}
                    <span
                      className="link"
                      onClick={() =>
                        this.props.handlePageChoice(
                          this.props.formType === "register"
                            ? "login"
                            : "register"
                        )
                      }
                    >
                      {this.props.formType === "register"
                        ? "Log In"
                        : "Register"}
                    </span>
                  </small>
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
