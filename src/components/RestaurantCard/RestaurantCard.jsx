import "./RestaurantCard.css"
import { useState } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { useNavigate } from "react-router";
function Restaurantcard({ data }) {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(data);
  function goToRestaurant() {
    navigate(`/restaurant/${restaurant?._id}`);
  }
  return (
    <Card link onClick={goToRestaurant}>
      <Card.Content textAlign="left">
        <Card.Header>{restaurant?.name}</Card.Header>
        <Card.Description>
          {restaurant.description}
          <Image rounded inline float="right" size="tiny" src={restaurant.logoUrl} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default Restaurantcard;
