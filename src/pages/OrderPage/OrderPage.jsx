import { useParams } from "react-router";
import { useContext, useEffect, useState} from "react";
import { UserContext, RestaurantContext } from "../../App";
import { getUserOrders, getRestaurantOrders } from "../../utils/orderApi";
function OrderPage() {
const user = useContext(UserContext)
const restaurant = useContext(RestaurantContext)
const [pendingOrders, setPendingOrders] = useState([])
const [pastOrders, setPastOrders] = useState([])

useEffect(() => { 
async function getOrders() { 
    if (user.isRestaurantOwner) { 
        const orders = await getRestaurantOrders(restaurant?._id)
    } else { 
        const orders = await getUserOrders(user?._id);
    }
    const pending = orders.filter((order) => order.status === false);
    const past = orders.filter((order) => order.status === true);
    setPendingOrders(pending)
    setPastOrders(past)
}
getOrders()
}, [])

    //make an order card for each order, if it is on the restaurant side then have an option to complete order (status: true)
    return  (
        user?.isRestaurantOwner ? 
            <div>restaurant order page</div>
            : 
            <div>customer order page</div>
    )
         
     
}

export default OrderPage;