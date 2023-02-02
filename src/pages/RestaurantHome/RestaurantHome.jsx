import { useContext, useState } from "react";

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
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p>{restaurant.address}</p>
          <EditRestaurantForm
            restaurant={restaurant}
            setRestaurant={setRestaurant}
          />
        </>
      ) : (
        <Load />
      )}
    </>
  );
}

export default RestaurantHome;
