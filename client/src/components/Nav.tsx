import React, { useState, useEffect, useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import UserContext from "../context/user";

export default function Nav() {
  const [activeItem, setActiveItem] = useState<string>("home");
  const user = useContext(UserContext);

  useEffect(() => {
    const item = localStorage.getItem("activeItem");
    if (item) {
      setActiveItem(item);
    }
  }, [activeItem]);

  return (
    <Menu pointing secondary>
      <Link to="/">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => {
            setActiveItem("home");
            localStorage.setItem("activeItem", "home");
          }}
        />
      </Link>
      <Link to="/profile">
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={() => {
            setActiveItem("profile");
            localStorage.setItem("activeItem", "profile");
          }}
        />
      </Link>
      <Link to="/users">
        <Menu.Item
          name="users"
          active={activeItem === "users"}
          onClick={() => {
            setActiveItem("users");
            localStorage.setItem("activeItem", "users");
          }}
        />
      </Link>
      {user.isLoggedIn ? (
        <Menu.Menu position="right">
          <Button>Logout</Button>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Menu.Menu>
      )}
    </Menu>
  );
}
