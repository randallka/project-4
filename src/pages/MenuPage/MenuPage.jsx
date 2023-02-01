import { useContext, useState, useEffect } from "react";
import { UserContext, RestaurantContext } from "../../App";

import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ItemCard from "../../components/ItemCard/ItemCard";

function MenuPage() {
    const user = useContext(UserContext)
    const restaurant = useContext(RestaurantContext)
    const [items, setItems] = useState([])
    useEffect(() => { 
        setItems(restaurant?.menu)
    }, [restaurant?.menu])
    
    return ( <div>
        <h1>{restaurant?.name}</h1>
        <h3>Menu</h3>
        {items?.map((item, i) => {
            return <ItemCard key={i} cardData={item}/>;
          })}
        {user._id === restaurant?.owner ? 
        <AddItemForm />
        : 
        <></>
        }
    </div> );
}

export default MenuPage;