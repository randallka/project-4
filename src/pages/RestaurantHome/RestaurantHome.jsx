import { useContext } from "react";

import { RestaurantContext } from "../../App";

import EditRestaurantForm from "../../components/EditRestaurantForm/EditRestaurantForm";

function RestaurantHome({ setRestaurant }) {
  const restaurant = useContext(RestaurantContext);

  return (
    <>
      {restaurant ? (
        <>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p>{restaurant.address}</p>
          <EditRestaurantForm
            restaurant={restaurant}
            setRestaurant={setRestaurant}
          />
        </>
      ) : (
        <p>No restaurant</p>
      )}
    </>
  );
}

export default RestaurantHome;
