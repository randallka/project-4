import { useState, useEffect, useContext } from "react";
import { getRestaurantByOwner } from "../../utils/restaurantApi";
import { UserContext } from "../../App";
import EditRestaurantForm from "../../components/EditRestaurantForm/EditRestaurantForm";
function RestaurantHome() {
    const user = useContext(UserContext)
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
      async function getRestaurant() {
        if (user.isRestaurantOwner) {
          const response = await getRestaurantByOwner(user);
          const data = (response.data[0])
          setRestaurant(data);
        }
      }
      getRestaurant();
    }, []);
    return ( <>
    <h1>{restaurant.name}</h1>
    <p>{restaurant.description}</p>
    <p>{restaurant.address}</p>
    <EditRestaurantForm restaurant={restaurant}/>

    </> );
}

export default RestaurantHome;