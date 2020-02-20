import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import "./index.css";

class AuthForm extends React.Component {
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

    if (this.props.formType === "register") {
      this.props.register(this.state);
    } else {
      this.props.login(this.state);
    }
  };
  render() {
    // if (this.props.username.length > 0 && this.props.climbs.length > 0) {
    //   return <Redirect to="/" />;
    // } else {
    //   if (this.props.username.length > 0) return <Redirect to="/addClimb" />;
    // }
    //above is a possible way to do routing if needed if user isn't logged in etc.
    return (
      <>
        <div className="form-container">
          <div className="form-div">
            <Form onSubmit={this.handleSubmit} className="form" size="small">
              <Segment raised>
                <Form.Field>
                  <span className="title">
                    {this.props.formType === "register" ? (
                      <h3>Register</h3>
                    ) : (
                      <h3>Login</h3>
                    )}
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

                {this.props.formType === "register" ? (
                  <>
                    {" "}
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
                  </>
                ) : null}
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
