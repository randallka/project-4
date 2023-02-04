import "./OrderPage.css";
import { useContext, useEffect, useState } from "react";
import { UserContext, RestaurantContext } from "../../App";
import {
  getUserOrders,
  getRestaurantOrders,
  completeOrder,
} from "../../utils/orderApi";
import Load from "../../components/Loader/Loader";
import { Grid, Header, Card } from "semantic-ui-react";
import OrderCard from "../../components/OrderCard/OrderCard";
function OrderPage() {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getOrders() {
      if (user.isRestaurantOwner) {
        setLoad(true);
        const orders = await getRestaurantOrders(restaurant?._id);
        const pending = orders.orders.filter((order) => order.status === false);
        const past = orders.orders.filter((order) => order.status === true);
        setPendingOrders(pending);
        setPastOrders(past);
        setLoad(false);
      } else {
        setLoad(true);
        const orders = await getUserOrders(user?._id);
        const pending = orders.orders.filter((order) => order.status === false);
        const past = orders.orders.filter((order) => order.status === true);
        setPendingOrders(pending);
        setPastOrders(past);
        setLoad(false);
      }
    }
    getOrders();
  }, []);

  async function complete(id) {
    setLoad(true);
    const completed = await completeOrder(id);
    setLoad(false);
    const newPending = pendingOrders.filter(
      (order) => order._id !== completed.order._id
    );
    const completedOrder = pendingOrders.filter(
      (order) => order._id === completed.order._id
    );
    setPastOrders([completed.order, ...pastOrders]);
    setPendingOrders(newPending);
  }

  if (load) {
    return <Load />;
  }
  return user?.isRestaurantOwner ? (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Grid.Row className="primary" textAlign="center">
            <Header as="h2">Pending Orders</Header>
          </Grid.Row>
          <Card.Group itemsPerRow={1}>
            {pendingOrders.map((order, i) => {
              return (
                <OrderCard complete={complete} key={i} data={order}></OrderCard>
              );
            })}
          </Card.Group>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Grid.Row className="primary">
            <Header as="h2">Fullfilled Orders</Header>
          </Grid.Row>
          <Card.Group itemsPerRow={1}>
            {pastOrders.map((order, i) => {
              return <OrderCard key={i} data={order}></OrderCard>;
            })}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Grid.Row className="primary">
            <Header as="h2">Pending Orders</Header>
          </Grid.Row>
          <Card.Group itemsPerRow={1}>
            {pendingOrders.map((order, i) => {
              return <OrderCard key={i} data={order}></OrderCard>;
            })}
          </Card.Group>
        </Grid.Column>

        <Grid.Column textAlign="center">
          <Grid.Row className="primary">
            <Header as="h2">Order History</Header>
          </Grid.Row>
          <Card.Group itemsPerRow={1}>
            {pastOrders.map((order, i) => {
              return <OrderCard key={i} data={order}></OrderCard>;
            })}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default OrderPage;
