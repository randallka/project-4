import { useContext, useState, useEffect } from "react";
import { UserContext, RestaurantContext } from "../../App";

import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ItemCard from "../../components/ItemCard/ItemCard";
import Load from "../../components/Loader/Loader";

function MenuPage() {
    const user = useContext(UserContext)
    const restaurant = useContext(RestaurantContext)
    const [load, setLoad] = useState(false);
    const [items, setItems] = useState([])
    useEffect(() => { 
        setLoad();
        setItems(restaurant?.menu)
        setLoad(false)
    }, [])
function updatePage(item) { 
    setItems([ 
        ...items, 
        item
    ])
}
  if (load) {
  return <Load />;
}  
    return ( <div>
        <h1>{restaurant?.name}</h1>
        <h3>Menu</h3>
        {items?.map((item, i) => {
            return <ItemCard key={i} cardData={item}/>;
          })}
        {user._id === restaurant?.owner ? 
        <AddItemForm updatePage={updatePage}/>
        : 
        <></>
        }
    </div> );
}

export default MenuPage;