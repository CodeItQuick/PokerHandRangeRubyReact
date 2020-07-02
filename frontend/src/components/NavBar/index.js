import React, { Fragment } from "react";

import { Menu, Item, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ username = false }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Menu inverted>
      <Menu.Item>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      {isAuthenticated != false ? (
        <Fragment>
          <Menu.Item>{username ? username : ""}</Menu.Item>
          <Menu.Item>
            <NavLink to="/donate">Donate</NavLink>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => logout()}>Logout</Button>
          </Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item>
            <NavLink to="/register">Register</NavLink>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </Menu.Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default Navbar;
