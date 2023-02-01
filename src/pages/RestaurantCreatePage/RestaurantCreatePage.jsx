import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { create } from "../../utils/restaurantApi";

function RestaurantCreatePage() {
  const user = useContext(UserContext);
  const [state, setState] = useState({
    name: "",
    address: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }
    try {
      await create(formData);
      navigate("/");
    } catch (err) {
      console.log(err.message, " this is the error in restaurant create page");
      setError("Error creating restaurant, please try again");
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          Enter Restaurant Information
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="name"
              placeholder="Restaurant Name"
              value={state.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="address"
              name="address"
              placeholder="Restaurant Address"
              value={state.address}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="description"
              name="description"
              value={state.description}
              placeholder="Describe your restaurant"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload restaurant logo"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Create Restaurant
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default RestaurantCreatePage;
