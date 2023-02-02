import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../App";
function OrderPage() {
const user = useContext(UserContext)
    //get customer orders userid

    //get Restaurant Orders restaurantid


    //make an order card for each order, if it is on the restaurant side then have an option to complete order (status: true)
    return  (
        user?.isRestaurantOwner ? 
            <div>restaurant order page</div>
            : 
            <div>customer order page</div>
    )
         
     
}

export default OrderPage;