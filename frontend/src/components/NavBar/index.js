import React, { Fragment, useState, useEffect } from "react";

import { Menu, Item, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar = ({
  isAuthenticated,
  loginWithRedirect,
  logout,
  user,
  getAccessTokenSilently,
  getUserMetadata
}) => {
  useEffect(() => {
    getUserMetadata();
  }, []);

  return (
    <Menu inverted>
      <Menu.Item>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      {isAuthenticated ? (
        <Fragment>
          <Menu.Item>{user.name || ""}</Menu.Item>
          <Menu.Item>
            <Button onClick={() => logout()}>Logout</Button>
          </Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </Menu.Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default Navbar;
