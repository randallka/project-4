import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/AddressForm/AddressForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Load from "../../components/Loader/Loader";
import { create } from "../../utils/restaurantApi";

function RestaurantCreatePage() {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    coordinates: [],
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }
    try {
      await create(formData);
      setLoading(false);
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
  function liftAddress(address) {
    setState({
      ...state,
      address: address.address,
      coordinates: address.coordinates,
    });
  }
  if (loading) {
    return <Load />;
  }
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Header as="h1" style={{ color: "rgb(254 160 48)", margin: "5vh" }}>
        Create Restaurant
      </Header>
      <Grid.Row columns={2}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                placeholder="Restaurant Name"
                value={state.name}
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

export default RestaurantCreatePage;
