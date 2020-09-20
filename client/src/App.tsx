import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import { Home, Login, Profile, Register, Users } from "./pages";
import { UserProvider } from "./context/user";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <Container>
      <UserProvider value={{ isLoggedIn: false, email: "" }}>
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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </Container>
  );
}

export default App;
