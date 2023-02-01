import React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useContext } from "react";

import { UserContext, RestaurantContext } from "../../App";

function PageHeader({ logout }) {
  const user = useContext(UserContext);
  const restaurant = useContext(RestaurantContext);
  return (
    <Menu inverted>
      <Container>
        <Link to="/">
          <Menu.Item header>
            <Image size="mini" src="" style={{ marginRight: "1.5em" }} />
            Project Name
          </Menu.Item>
        </Link>
        <Menu.Item as="a" onClick={logout}>
          Logout
        </Menu.Item>
        <Dropdown item simple text="Dropdown">
          <Dropdown.Menu>
            {user?.isRestaurantOwner ? (
              <>
                <Dropdown.Item as={Link} to="/">
                  Restaurant Info
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/menu/${restaurant?._id}`}>
                  Menu
                </Dropdown.Item>
                <Dropdown.Item>Orders</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item as={Link} to={`/orders/${user?._id}`}>
                  Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/cart/${user?._id}`}>
                  Cart
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
}

export default PageHeader;
