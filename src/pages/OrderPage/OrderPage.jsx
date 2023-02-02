import { useParams } from "react-router";
import { useContext, useEffect, useState} from "react";
import { UserContext, RestaurantContext } from "../../App";
import { getUserOrders, getRestaurantOrders, completeOrder } from "../../utils/orderApi";
import Load from "../../components/Loader/Loader";

function OrderPage() {
const user = useContext(UserContext)
const restaurant = useContext(RestaurantContext)
const [pendingOrders, setPendingOrders] = useState([])
const [pastOrders, setPastOrders] = useState([])
const [load, setLoad] = useState(false);
useEffect(() => { 
async function getOrders() { 
    console.log(restaurant?._id)
    if (user.isRestaurantOwner) { 
        setLoad(true)
        const orders = await getRestaurantOrders(restaurant?._id)
        console.log(orders.orders)
        const pending = orders.orders.filter((order) => order.status === false);
        const past = orders.orders.filter((order) => order.status === true);
        setPendingOrders(pending);
        setPastOrders(past);
        setLoad(false)
    } else { 
        setLoad(true)
        const orders = await getUserOrders(user?._id);
        console.log(orders.orders);
        const pending = orders.orders.filter((order) => order.status === false);
        const past = orders.orders.filter((order) => order.status === true);
        setPendingOrders(pending);
        setPastOrders(past);
        setLoad(false)
    }
}
getOrders()
}, [])

function complete(id) { 
    setLoad(true)
    console.log("completing order", id)
    completeOrder(id)
    setLoad(false)
}
if (load) {
  return <Load />;
}
    //make an order card for each order, if it is on the restaurant side then have an option to complete order (status: true)
    return user?.isRestaurantOwner ? (
      <div>
        restaurant order page
        <div>
          {pendingOrders.map((order, i) => {
            return (
                <div key={i}>
              <h1 >
                {order.address}, pending
              </h1>
              <button onClick={() => complete(order._id)}> mark complete</button></div>
            );
          })}
        </div>
        <div>
          {pastOrders.map((order, i) => {
            return <h1 key={i}>{order.address}, past</h1>;
          })}
        </div>
      </div>
    ) : (
      <div>
        customer order page
        <div>
          {pendingOrders.map((order, i) => {
            return (
              <h1 key={i}>
                {order.address}, pending
              </h1>
            );
          })}
        </div>
        <div>
          {pastOrders.map((order, i) => {
            return (
              <h1 key={i}>
                {order.address}, past
              </h1>
            );
          })}
        </div>
      </div>
    );
         
     
}

export default OrderPage;