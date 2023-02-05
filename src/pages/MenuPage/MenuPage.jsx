import { useContext, useState, useEffect } from "react";
import { UserContext, RestaurantContext } from "../../App";
import { Header, Grid, Card } from "semantic-ui-react";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ItemCard from "../../components/ItemCard/ItemCard";
import Load from "../../components/Loader/Loader";

// add item takes a long time: add card loader to show action
function MenuPage() {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);
  const [load, setLoad] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setLoad(true);
    setItems(restaurant?.menu);
    setLoad(false);
  }, []);
  function updatePage(item) {
    setItems([...items, item]);
  }

  function removeCard(id) {
    const newArr = items.filter((item) => item._id !== id);
    setItems(newArr);
  }
  if (load) {
    return <Load />;
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1 style={{ color: "white" }}>{restaurant?.name}</h1>
          <h3 style={{ color: "white" }}>Menu</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }}>
          <Card.Group itemsPerRow={3}>
            {items?.map((item, i) => {
              return (
                <ItemCard key={i} cardData={item} removeCard={removeCard} />
              );
            })}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
      {user._id === restaurant?.owner ? (
        <Grid.Row textAlign="center">
          <AddItemForm updatePage={updatePage} />
        </Grid.Row>
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default MenuPage;
