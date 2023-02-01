import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { index } from "../../utils/restaurantApi";

export default function UserHomePage() {
  const [restaurants, setRestaurants] = useState([]);
  async function getAll() {
    try {
      const response = await index();
      setRestaurants(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAll();
  }, []);

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
