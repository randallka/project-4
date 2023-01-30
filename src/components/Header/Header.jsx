import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from "semantic-ui-react";
import { useContext } from "react";
import { UserContext } from "../../App";

function PageHeader({logout}) {
    const user = useContext(UserContext)
  return (
    <Menu inverted>
      <Container>
        <Link to="/">
          <Menu.Item header>
            <Image
              size="mini"
              src=""
              style={{ marginRight: "1.5em" }}
            />
            Project Name
          </Menu.Item>
        </Link>
        <Menu.Item as="a" onClick={logout}>
          Logout
        </Menu.Item>

        <Dropdown item simple text="Dropdown">
          <Dropdown.Menu>
            {user.isRestaurantOwner ? 
            <>
            <Dropdown.Item>Restaurant Info</Dropdown.Item>
            <Dropdown.Item>Menu</Dropdown.Item>
            <Dropdown.Item>Orders</Dropdown.Item>
            </>
            : 
            <>
            <Dropdown.Item>Orders</Dropdown.Item>
            <Dropdown.Item>Profile</Dropdown.Item>
            </>}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
}

export default PageHeader;
