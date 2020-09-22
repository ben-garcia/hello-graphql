import React, { useState, useEffect, useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Nav() {
  const [activeItem, setActiveItem] = useState<string>("home");
  const { isLoggedIn, setIsLoggedIn }: any = useContext(UserContext);

  useEffect(() => {
    const item = localStorage.getItem("activeItem");

    if (item) {
      setActiveItem(item);
    }
  }, [activeItem]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Menu pointing secondary>
      {isLoggedIn ? (
        <>
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
          <Menu.Menu position="right">
            <Button>Logout</Button>
          </Menu.Menu>
        </>
      ) : (
        <Menu.Menu position="right">
          <Link to="/register">
            <Button onClick={() => localStorage.setItem("activeItem", "")}>
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button onClick={() => localStorage.setItem("activeItem", "")}>
              Login
            </Button>
          </Link>
        </Menu.Menu>
      )}
    </Menu>
  );
}
