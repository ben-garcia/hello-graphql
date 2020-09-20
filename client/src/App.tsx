import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <Container>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
