import "./LoginPage.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Image,
} from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Load from "../../components/Loader/Loader";

import userService from "../../utils/userService";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  if (load) {
    return <Load />;
  }
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center" style={{color: "white"}}>
          <Image
            circular
            src="https://i.imgur.com/VqmjIcX.png"
            style={{ marginRight: "1.5em" }}
          />
          Log-in to your account
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button fluid size="large" type="submit" className="btn">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  );
}
