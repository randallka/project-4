import { useEffect, useContext, useState } from "react";
import UserContext from "../../App";
function Cartpage() {
  const user = useContext(UserContext);
  const [cart, setcart] = useState([]);
  const [cartinfo, setCartInfo] = useState({
    total: "", 
    itemCount: "",
  })
  useEffect(() => {
    async function getCart() {
      try {
        //const cart = await cartApi.getcart(user._id)
        //setCart(cart.items)
      } catch (err) {
        console.log(err);
      }
    }
    getCart()
    // const cartTotal = cart.map(item => item?.price).reduce((prev, next) => prev + next)
    // setcart({ 
    //     ...cart,
    //     total: cartTotal,
    // })
  }, []);

  async function removeItemFromCart(id) {
    try {
      //await cartApi.removeItem
    } catch (err) {
      console.log(err);
    }
  }

  return <div>Customer cart</div>;
  //show items with a delete button 
}

export default Cartpage;
