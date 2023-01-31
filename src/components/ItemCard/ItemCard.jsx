import { Card, Button, Image } from 'semantic-ui-react'
import { useContext } from 'react';
import { UserContext, RestaurantContext } from '../../App';
function ItemCard({cardData}) {
    const user = useContext(UserContext)
    const restaurant = useContext(RestaurantContext)
    return (
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={cardData.photoUrl}
          />
          <Card.Header>{cardData.name}</Card.Header>
          <Card.Meta>{cardData.price}</Card.Meta>
          <Card.Description>
            {cardData.description}
          </Card.Description>
        </Card.Content>
        {user._id === restaurant?.owner ? 
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Edit Item
            </Button>
            <Button basic color="red">
              Delete Item
            </Button>
          </div>
        </Card.Content>
        : 
        <></>}
      </Card>
    );
}

export default ItemCard;