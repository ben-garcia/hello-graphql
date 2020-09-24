import React from "react";
import { Container } from "semantic-ui-react";

import UserProvider from "./contexts/UserContext";
import MovieProvider from "./contexts/MovieContext";
import Routes from "./router";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <Container>
      <UserProvider>
        <MovieProvider>
          <Routes />
        </MovieProvider>
      </UserProvider>
    </Container>
  );
}

export default App;
