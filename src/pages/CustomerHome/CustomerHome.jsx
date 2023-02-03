import "./CustomerHome.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Header } from "semantic-ui-react";

import { index } from "../../utils/restaurantApi";
import Load from "../../components/Loader/Loader";
import RecentOrder from "../../components/RecentOrder/RecentOrder";
import Restaurantcard from "../../components/RestaurantCard/RestaurantCard";
export default function UserHomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [load, setLoad] = useState(false);
  async function getAll() {
    try {
      setLoad(true);
      const response = await index();
      setRestaurants(response.data);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAll();
  }, []);
  if (load) {
    return <Load />;
  }

  // return most recent order display
  //return a list of restaurant cards
  return (
    <Grid centered>
      <Grid.Row>
        <RecentOrder />
      </Grid.Row>
      <Grid.Row className="primary">
        <Header as="h1">Available Restaurants:</Header>
      </Grid.Row>
      <Grid.Row>
        <Card.Group itemsPerRow={3}>
          <div>
            {restaurants.map((restaurant, i) => {
              return (
                <Restaurantcard key={i} data={restaurant}>
                  
                </Restaurantcard>
                
              );
            })}
          </div>
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
}
