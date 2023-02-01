import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import { getCart, removeItem } from "../../utils/cartApi";
import { placeOrder } from "../../utils/orderApi";
import ItemCard from "../../components/ItemCard/ItemCard";

//need to update component when items are added/removed- right now it takes a refresh
function Cartpage() {
  const user = useContext(UserContext);
  const { id } = useParams();
  const [cart, setCart] = useState();
  const [cartInfo, setCartInfo] = useState({
    total: 0,
    itemCount: 0,
  });
  useEffect(() => {
    async function getUserCart() {
      try {
        const foundCart = await getCart(id);
        setCart(foundCart.cart.items);
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
        console.log(user)
      console.log(cart, "cart");
      function formatOrder() {
        const keys = [];
        cart.forEach((item) => {
          if (keys.includes(item.restaurant)) {
          } else {
            keys.push(item.restaurant);
            console.log(keys);
          }
        });
        keys.forEach((key) => {
          console.log(key);
          const restaurantItems = [];
          cart.forEach((item) => {
            console.log(item._id);
            if (item.restaurant === key) {
              restaurantItems.push(item._id);
            }
          });
          console.log(restaurantItems, "restaurant Items");
          const orderObj = {
            customer: user._id,
            items: restaurantItems,
            restaurant: key,
            status: false,
            address: user.address,
          };
          console.log(orderObj, "order object");
        });
      }
      formatOrder();
    } catch (err) {
      // go through cart items and group them by restaurant
      // await placeOrder()
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Cart items: </h1>
      {cart?.map((item, i) => {
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
