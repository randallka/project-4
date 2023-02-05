import {
  Button,
  Form,
  Grid,
  Header,
  Checkbox,
  Segment,
} from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

import userService from "../../utils/userService";
import Load from "../../components/Loader/Loader";
import AddressForm from "../../components/AddressForm/AddressForm";

function SignUpPage({ handleSignUpOrLogin }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    address: "",
    coordinates: [],
    isRestaurantOwner: false,
  });

  const [addressConfirmation, setAddressConfirmation] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);
    if (state.password === state.passwordConf) {
      try {
        console.log(state);
        await userService.signup(state);
        handleSignUpOrLogin();
        if (state.isRestaurantOwner) {
          navigate("/signup/restaurant");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err.message, "this is the error in signup");
        setError("Error signing up, please try again");
      }
    } else {
      setLoad(false);
      setError("Please make sure your passwords match");
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

  function liftAddress(address) {
    console.log("lifting to signup page");
    setState({
      ...state,
      address: address.address,
      coordinates: address.coordinates,
    });
    setAddressConfirmation(true);
  }

  if (load) {
    return <Load />;
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Header as="h1" style={{ color: "rgb(254 160 48)", margin: "5vh" }}>
        SignUp
      </Header>
      <Grid.Row columns={2}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Field>
                <Checkbox
                  style={{ color: "white" }}
                  label="I am signing up as a restaurant owner"
                  toggle
                  onChange={handleCheck}
                />
              </Form.Field>
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
              {addressConfirmation ? (
                <Button type="submit" className="btn">
                  Signup
                </Button>
              ) : (
                <Button disabled className="btn">
                  Waiting for address confimation...
                </Button>
              )}
            </Segment>
          </Form>
        </Grid.Column>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddressForm liftAddress={liftAddress} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          {error ? <ErrorMessage error={error} /> : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SignUpPage;
