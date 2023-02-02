import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { index } from "../../utils/restaurantApi";
import Load from "../../components/Loader/Loader";

  
  
export default function UserHomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [load, setLoad] = useState(false)
  async function getAll() {
    try {
      setLoad(true)
      const response = await index();
      setRestaurants(response.data);
      setLoad(false)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAll();
  }, []);
if (load) { 
    return ( 
      <Load />
    )
  }
  return (
    <div>
      {restaurants.map((restaurant, i) => {
        return (
          <div key={i}>
            <Link to={`/restaurant/${restaurant?._id}`}>
              {restaurant?.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
