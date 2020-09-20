import React, { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <Menu pointing secondary>
      <Link to="/">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
        />
      </Link>
      <Link to="profile">
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={() => setActiveItem("profile")}
        />
      </Link>
      <Link to="users">
        <Menu.Item
          name="users"
          active={activeItem === "users"}
          onClick={() => setActiveItem("users")}
        />
      </Link>
      <Menu.Menu position="right">
        <Button>Logout</Button>
      </Menu.Menu>
    </Menu>
  );
}
