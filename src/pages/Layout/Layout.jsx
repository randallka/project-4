import "./Layout.css";
import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router";
import Header from "../../components/Header/Header";

function Layout({ logout }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header logout={logout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Outlet />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Layout;
