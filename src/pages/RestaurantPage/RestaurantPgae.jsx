import { useState, useEffect } from "react";
import { useParams } from "react-router";

import ItemCard from "../../components/ItemCard/ItemCard.jsx";

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
        setLoad(false)
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
    <>
      <div>Hello from {restaurant?.name}</div>
      <div>
        {restaurant?.menu?.map((item, i) => {
          return <ItemCard key={i} cardData={item} />;
        })}
      </div>{" "}
    </>
  );
}

export default RestaurantPage;
