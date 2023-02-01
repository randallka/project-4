import { Card, Button, Image } from "semantic-ui-react";
import { useContext } from "react";
import { UserContext, RestaurantContext } from "../../App";

import EditItemForm from "../EditItemForm/EditItemForm";

import { deleteItem } from "../../utils/itemApi";

function ItemCard({ cardData }) {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);

  function deleteCardItem() {
    deleteItem(cardData?._id);
  }
  function addItemToCart() {
    console.log("add to cart will go here");
  }
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={cardData.imageUrl} />
        <Card.Header>{cardData.name}</Card.Header>
        <Card.Meta>{cardData.price}</Card.Meta>
        <Card.Description>{cardData.description}</Card.Description>
      </Card.Content>
      {user._id === restaurant?.owner ? (
        <Card.Content extra>
          <div className="ui two buttons">
            <EditItemForm item={cardData} />
            <Button basic color="red" onClick={deleteCardItem}>
              Delete Item
            </Button>
          </div>
        </Card.Content>
      ) : (
        <Card.Content extra>
          <div className="ui one buttons">
            <Button basic color="green" onClick={addItemToCart}>
              Add to cart
            </Button>
          </div>
        </Card.Content>
      )}
    </Card>
  );
}

export default ItemCard;
