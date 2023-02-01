import { Button, Form, Grid, Header, Checkbox, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";

function SignUpPage({ handleSignUpOrLogin }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    address: "",
    isRestaurantOwner: false,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); 
if (state.password === state.passwordConf) { 
    try {
        
      await userService.signup(state); 
      handleSignUpOrLogin();
      if (state.isRestaurantOwner) { 
        navigate('/signup/restaurant')
      } else { 
        navigate("/");
      }
    } catch (err) {
      console.log(err.message, "this is the error in signup");
      setError("Error signing up, please try again");
    }
  }else { 
    setError("Please make sure your passwords match")
} 
}
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  function handleCheck(e) { 
    setState({
      ...state,
      isRestaurantOwner: !state.isRestaurantOwner,
    });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Field>
            <Checkbox
              label="I am signing up as a restaurant owner"
              toggle
              onChange={handleCheck}
            />
          </Form.Field>
          <Segment stacked>
            <Form.Input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <Form.Input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              required
            />
            <Form.Input
              type="address"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;
