import React, { Fragment } from "react";

import { Menu, Item } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ username = false }) => {
  return (
    <Menu inverted>
      <Menu.Item>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      {username != false ? (
        <Fragment>
          <Menu.Item>{username ? username : ""}</Menu.Item>
          <Menu.Item>
            <NavLink to="/donate">Donate</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/">Logout</NavLink>
          </Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item>
            <NavLink to="/register">Register</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default Navbar;
