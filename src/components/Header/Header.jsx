import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
} from "semantic-ui-react";

function PageHeader({logout}) {
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
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
}

export default PageHeader;
