import "./OrderCard.css";
import { useState } from "react";
import { Card, Accordion, Icon, List, Image, Button } from "semantic-ui-react";
import Load from "../Loader/Loader";

function OrderCard({ data, complete }) {
  const [activeindex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const date = new Date(data.createdAt);
  const day = date.toDateString();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleClick(titleProps) {
    const newIndex = activeindex === titleProps ? -1 : titleProps;
    setActiveIndex(newIndex);
  }
  if (loading) {
    return <Load />;
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {data.restaurant.name}
          {"   "}
          {data.status ? (
            <Icon name="history" floated="right" />
          ) : (
            <Icon loading name="shipping fast" floated="right" />
          )}
        </Card.Header>
        <Card.Meta>{day}</Card.Meta>
        <Card.Meta>{time}</Card.Meta>
        <Accordion styled fluid>
          <Accordion.Title
            active={activeindex === 0}
            index={0}
            onClick={() => handleClick(0)}
          >
            <Icon name="dropdown" />
            Items
          </Accordion.Title>
          <Accordion.Content active={activeindex === 0}>
            <List>
              {data.items.map((item, i) => {
                return (
                  <List.Item key={i}>
                    <Image avatar src={item.imageUrl} />
                    <List.Content>
                      <List.Header>
                        {item.name}: ${item.price}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      {complete ? (
        <Card.Content extra>
          <div className="ui one buttons">
            <Button basic color="green" onClick={() => complete(data._id)}>
              Mark Delivered
            </Button>
          </div>
        </Card.Content>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default OrderCard;
