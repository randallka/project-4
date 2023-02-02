import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../App";
function OrderPage() {
const user = useContext(UserContext)
    //get customer orders

    //get Restaurant Orders

    return  (
        user?.isRestaurantOwner ? 
            <div>restaurant order page</div>
            : 
            <div>customer order page</div>
    )
         
     
}

export default OrderPage;