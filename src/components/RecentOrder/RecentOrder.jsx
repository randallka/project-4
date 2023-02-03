import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Segment, Header, Image, Button } from "semantic-ui-react";
import { getUserOrders } from "../../utils/orderApi";
import { addToCart } from "../../utils/cartApi";
import Load from "../Loader/Loader";
function RecentOrder() {
    const navigate = useNavigate()
  const user = useContext(UserContext);
  const [recent, setRecent] = useState();
  const [load, setload] = useState(true);
  //get recent by user Id function
  useEffect(() => {
    async function getRecent() {
      try {
        const orders = await getUserOrders(user?._id);
        setRecent(orders.orders[0]);
        setload(false);
      } catch (err) {
        console.log(err);
      }
    }
    getRecent();
  }, []);
async function orderAgain() { 
    try { 
        setload(true)
        recent.items.map((item) => {
            addToCart(item)
        })
        setload(false)
        navigate(`/cart/${user._id}`)
    }catch(err) { 
        console.log(err)
    }
}
  if (load) {
    return <Load />;
  }
  return recent ? (
    <Segment raised>
      <Header>Recent order from {recent.restaurant.name}</Header>
      <Segment.Inline>
        {recent.items.map((item, i) => {
          return (
            <Image key={i} rounded bordered size="tiny" src={item.imageUrl} />
          );
        })}
      </Segment.Inline>
      <Button floated="right" onClick={orderAgain}>Oder Again</Button>
      {/* order again? -> will add items to cart and direct to cart */}
    </Segment>
  ) : (
    <Segment raised>
      <Header>No recent orders</Header>
    </Segment>
  );
}

export default RecentOrder;
