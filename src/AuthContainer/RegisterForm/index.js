import React from "react";
import { Form } from "semantic-ui-react";

class RegisterForm extends React.Component {
  constructor() {
    super();
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
  render() {
    return (
      <>
        <Form size="small">
          <Form.Field>
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
        </Form>
      </>
    );
  }
}

export default RegisterForm;
