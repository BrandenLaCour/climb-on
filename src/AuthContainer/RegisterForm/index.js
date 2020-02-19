import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import "./index.css";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      city: "",
      picture: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state);
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
                    <h3>Register</h3>
                  </span>
                  <label>Username</label>
                  <input
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    placeholder="enter username"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="enter password"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="enter email"
                  />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                    placeholder="enter city"
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
                <div className="submit">
                  <Button>Submit</Button>
                </div>
              </Segment>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterForm;
