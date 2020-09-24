import React, { useState, useEffect, useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Nav() {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState<string>("");
  const {
    setId,
    isLoggedIn,
    setIsLoggedIn,
    setEmail,
    setCreatedAt,
    setUpdatedAt,
  } = useContext(UserContext);

  useEffect(() => {
    const item = localStorage.getItem("activeItem");

    if (item) {
      setActiveItem(item);
    }
  }, [activeItem]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const item = localStorage.getItem("activeItem");

    if (user && !isLoggedIn) {
      setIsLoggedIn!(true);
      const parsedUser = JSON.parse(user);
      setEmail!(parsedUser.email);
      setCreatedAt!(parsedUser.createdAt);
      setUpdatedAt!(parsedUser.createdAt);
      setId!(parsedUser.id);
      if (!item) localStorage.setItem("activeItem", "profile");
      else history.replace(`/${item}`);
    }
    // eslint-disable-next-line
  }, [activeItem]);

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
