import { useEffect, useContext, useState } from "react";

import { getCart, removeItem, emptyCart } from "../../utils/cartApi";
import { placeOrder } from "../../utils/orderApi";

import { UserContext } from "../../App";

import ItemCard from "../../components/ItemCard/ItemCard";
import Load from "../../components/Loader/Loader";
//need to update component when items are added/removed- right now it takes a refresh
function Cartpage() {
  const user = useContext(UserContext);

  const [load, setLoad] = useState(false);
  const [cart, setCart] = useState({});
  const [cartInfo, setCartInfo] = useState({
    total: 0,
    itemCount: 0,
  });

  useEffect(() => {
    async function getUserCart() {
      try {
        setLoad(true);
        const foundCart = await getCart(user?._id);
        setCart(foundCart.cart);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    }
    getUserCart();
  }, []);

  async function removeItemFromCart(id) {
    try {
      setLoad(true);
      const cart = await removeItem(id);
      setCart(cart)
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function makeOrder() {
    try {
      function formatOrder() {
        const orders = [];
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
          orders.push(orderObj);
        });
        return orders;
      }
      setLoad(true);
      const orders = formatOrder();
      orders.forEach((order) => {
        console.log(order, "passed in controller");
        placeOrder(order);
        emptyCart(cart._id);
        setCart([]);
      });
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (load) {
    return <Load />;
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
