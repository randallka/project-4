import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import { useContext } from "react";

import { UserContext, RestaurantContext } from "../../App";

function PageHeader({ logout }) {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);
  return (
    <Menu size="large" inverted>
      <Container>
        <Link to="/">
          <Menu.Item header>
            <Image
              circular
              size="mini"
              src="https://i.imgur.com/VqmjIcX.png"
              style={{ marginRight: "1.5em" }}
            />
            FoodFast
          </Menu.Item>
        </Link>

        {user?.isRestaurantOwner ? (
          <>
            <Menu.Item as={Link} to="/">
              Restaurant Info
            </Menu.Item>
            <Menu.Item as={Link} to={`/menu/${restaurant?._id}`}>
              Menu
            </Menu.Item>
            <Menu.Item as={Link} to={`/orders/${restaurant?._id}`}>
              Orders
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to={`/orders/${user?._id}`}>
              Orders
            </Menu.Item>
            <Menu.Item as={Link} to={`/cart/${user?._id}`}>
              Cart <Icon name="shopping cart" size="small" /> 
            </Menu.Item>
          </>
        )}

        <Menu.Item position="right" as="a" onClick={logout}>
          Logout
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default PageHeader;
