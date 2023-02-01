import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemCard from "../../components/ItemCard/ItemCard.jsx";
import * as restaurantApi from "../../utils/restaurantApi.js"
function RestaurantPage() {
    const restaurantId = useParams()
    const [restaurant, setRestaurant] = useState({})
useEffect(() => { 
    async function getRestaurant() { 
        try { 
            const restaurantData = await restaurantApi.getOne(restaurantId.id)
            setRestaurant(restaurantData.data)
        }catch(err) {    
            console.log(err)
        }
    }
    getRestaurant()
}, [])

    return ( <><div>Hello from {restaurant?.name}</div>
    <div>
        {restaurant?.menu?.map((item, i) => { 
            return (<ItemCard key={i} cardData={item}/>)
        })}
        </div> </>);
}

export default RestaurantPage;