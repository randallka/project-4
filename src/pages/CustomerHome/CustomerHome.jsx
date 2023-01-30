import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { index } from "../../utils/restaurantApi";
export default function UserHomePage(props) {
const [restaurants, setRestaurants] = useState([]);
async function getAll() {
  try {
    const response = await index();
    console.log(response, " data");
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
          <p>{restaurant.name}</p>
        </div>
      )})}
    </div>
  )
    
}
