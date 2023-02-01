import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { index } from "../../utils/restaurantApi";
import { Link } from "react-router-dom";
export default function UserHomePage(props) {
const [restaurants, setRestaurants] = useState([]);
async function getAll() {
  try {
    const response = await index();
    setRestaurants(response.data);
  } catch (err) {
   console.log(err)
    
  }
}
useEffect(() => {
  getAll();
}, []); 



  return ( 
    <div>
      {restaurants.map((restaurant, i) => {
      return( 
        <div key={i}>
          <Link to={`/restaurant/${restaurant?._id}`}>{restaurant?.name}</Link>
        </div>
      )})}
    </div>
  )
    
}
