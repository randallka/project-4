import { useContext, useState } from "react";
import { Grid, Image, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../../App";

import EditRestaurantForm from "../../components/EditRestaurantForm/EditRestaurantForm";
import Load from "../../components/Loader/Loader";


function RestaurantHome({ setRestaurant }) {
  const restaurant = useContext(RestaurantContext);
  const [load, setLoad] = useState(false);
  if (load) {
    return <Load />;
  }
  return (
    <>
      {restaurant ? (
        <>
          <Grid centered>
            <Grid.Row>
              <Image
                size="small"
                verticalAlign="middle"
                floated="left"
                circular
                src={restaurant.logoUrl}
              ></Image>
            </Grid.Row>
            <Header style={{ color: "white" }} as="h1">
              {restaurant.name}: Info
            </Header>
            <Grid.Row>
              <Grid.Column>
                <Segment textAlign="center">
                  Your Address: {restaurant.address}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment textAlign="center">
                  Your Description: {restaurant.description}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <EditRestaurantForm
                restaurant={restaurant}
                setRestaurant={setRestaurant}
              />
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <h1 style={{ color: "white" }}>
          It looks like you havent created your reastaurant:{" "}
          <Link to="/signup/restaurant">Create One</Link>
        </h1>
      )}
    </>
  );
}

export default RestaurantHome;
