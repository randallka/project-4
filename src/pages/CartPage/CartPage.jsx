import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../App";
import { getCart } from "../../utils/cartApi";
import ItemCard from "../../components/ItemCard/ItemCard";
function Cartpage() {
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
      //await cartApi.removeItem
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Cart items: </h1>
      {cart?.map((item, i) => {
        return <ItemCard key={i} cardData={item} />;
      })}
    </div>
  );
  //show items with a delete button
}

export default Cartpage;
