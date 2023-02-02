import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import { getCart, removeItem, emptyCart } from "../../utils/cartApi";
import { placeOrder } from "../../utils/orderApi";
import ItemCard from "../../components/ItemCard/ItemCard";

//need to update component when items are added/removed- right now it takes a refresh
function Cartpage() {
  const user = useContext(UserContext);
  const { id } = useParams();
  const [cart, setCart] = useState({});
  const [cartInfo, setCartInfo] = useState({
    total: 0,
    itemCount: 0,
  });
  useEffect(() => {
    async function getUserCart() {
      try {
        const foundCart = await getCart(id);
        setCart(foundCart.cart);
      } catch (err) {
        console.log(err);
      }
    }
    getUserCart();
  }, []);

  async function removeItemFromCart(id) {
    try {
      await removeItem(id);
    } catch (err) {
      console.log(err);
    }
  }

  async function makeOrder() {
    try {
      function formatOrder() {
        const orders = []
        const keys = [];
        cart.items.forEach((item) => {
          if (keys.includes(item.restaurant)) {
          } else {
            keys.push(item.restaurant);
          }
        });
        keys.forEach((key) => {
          const restaurantItems = [];
          cart.items.forEach((item) => {
            if (item.restaurant === key) {
              restaurantItems.push(item._id);
            }
          });
          const orderObj = {
            customer: user._id,
            items: restaurantItems,
            restaurant: key,
            status: false,
            address: user.address,
          };
          orders.push(orderObj) 
        });
        return orders
      }
      const orders = formatOrder()
      orders.forEach((order) => { 
        console.log(order, "passed in controller")
        placeOrder(order)
        emptyCart(cart._id)
        setCart([])
      })
      
    } catch (err) {
      // go through cart items and group them by restaurant
      // await placeOrder()
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Cart items: </h1>
      {cart?.items?.map((item, i) => {
        return (
          <ItemCard
            key={i}
            cardData={item}
            inCart={true}
            removeFromCart={removeItemFromCart}
          />
        );
      })}
      <button onClick={makeOrder}>Order items</button>
    </div>
  );
}

export default Cartpage;
