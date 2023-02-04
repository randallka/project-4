import { useState, useEffect } from "react";
import { useParams } from "react-router";

import ItemCard from "../../components/ItemCard/ItemCard.jsx";
import { Card, Grid, Header, Image, Segment } from "semantic-ui-react";
import * as restaurantApi from "../../utils/restaurantApi.js";
import Load from "../../components/Loader/Loader";

function RestaurantPage() {
  const restaurantId = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getRestaurant() {
      try {
        setLoad(true);
        const restaurantData = await restaurantApi.getOne(restaurantId.id);
        setRestaurant(restaurantData.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurant();
  }, []);
  if (load) {
    return <Load />;
  }
  return (
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
        {restaurant.name}
      </Header>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }}>
          <Segment textAlign="center">{restaurant.address}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }}>
          <Segment textAlign="center">{restaurant.description}</Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }}>
          <Header textAlign='center' style={{ color: "white" }} as="h1">
            Menu:
          </Header>
          <Card.Group itemsPerRow={3}>
            {restaurant?.menu?.map((item, i) => {
              return <ItemCard key={i} cardData={item} />;
            })}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default RestaurantPage;
