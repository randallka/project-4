import { useContext, useState, useEffect } from "react";
import { UserContext, RestaurantContext } from "../../App";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
function MenuPage() {
    const user = useContext(UserContext)
    const restaurant = useContext(RestaurantContext)
    const [items, setItems] = useState(restaurant?.menu)
useEffect(() => {
    console.log("useEffect!")
    
}, [])

    
    return ( <div>
        <h1>{restaurant?.name}</h1>
        <h3>Menu</h3>
        {user._id === restaurant?.owner ? 
        <AddItemForm />
        : 
        <></>
        }
    </div> );
}

export default MenuPage;