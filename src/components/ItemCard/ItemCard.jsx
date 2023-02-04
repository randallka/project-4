import { Card, Button, Image } from "semantic-ui-react";
import { useContext, useState } from "react";
import { UserContext, RestaurantContext } from "../../App";
import { addToCart } from "../../utils/cartApi";
import EditItemForm from "../EditItemForm/EditItemForm";

import { deleteItem } from "../../utils/itemApi";

function ItemCard({ cardData, inCart, removeFromCart, removeCard }) {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);
const [info, setInfo] = useState(cardData)
  function deleteCardItem() {
    deleteItem(info._id);
    removeCard(info._id)
  }
  async function addItemToCart() {
    try {
      console.log(info._id);
      addToCart(info._id);
    } catch (err) {
      console.log(err);
    }
  }
  function removeItem() { 
    removeFromCart(info._id)
  }
  function updateCard(data) { 
    setInfo({
        ...info,
        name: data.name,
        price: data.price,
        description: data.description
    }
    )
  }
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={cardData.imageUrl} />
        <Card.Header>{info.name}</Card.Header>
        <Card.Meta>${info.price}</Card.Meta>
        <Card.Description>{info.description}</Card.Description>
      </Card.Content>
      {user?._id === restaurant?.owner ? (
        <Card.Content extra>
          <div className="ui two buttons">
            <EditItemForm item={cardData} updateCard={updateCard} />
            <Button basic color="red" onClick={deleteCardItem}>
              Delete Item
            </Button>
          </div>
        </Card.Content>
      ) : (
        <Card.Content extra>
          <div className="ui one buttons">
            {inCart ? (
              <Button basic color="red" onClick={removeItem}>
                remove from cart
              </Button>
            ) : (
              <Button basic color="green" onClick={addItemToCart}>
                Add to cart
              </Button>
            )}
          </div>
        </Card.Content>
      )}
    </Card>
  );
}

export default ItemCard;
