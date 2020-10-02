import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "../components/Nav";
import { Home, Login, Movie, Profile, Register, Users } from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <ProtectedRoutes>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
}

export default Routes;
