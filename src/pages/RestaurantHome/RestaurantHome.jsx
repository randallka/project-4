import { useState, useEffect, useContext } from "react";
import { getRestaurantByOwner } from "../../utils/restaurantApi";
import { UserContext } from "../../App";
import { RestaurantContext } from "../../App";
import EditRestaurantForm from "../../components/EditRestaurantForm/EditRestaurantForm";
function RestaurantHome({setRestaurant}) {
    const user = useContext(UserContext)
    const restaurant = useContext(RestaurantContext)

    
    return ( <>
    {restaurant ? 
    <>
    <h1>{restaurant.name}</h1>
    <p>{restaurant.description}</p>
    <p>{restaurant.address}</p>
    <EditRestaurantForm restaurant={restaurant} setRestaurant={setRestaurant}/>
    </>
    : 
    <p>No restaurant</p>
    }
    
    </> );
}

export default RestaurantHome;