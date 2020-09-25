import React, { useReducer } from "react";
import { Container } from "semantic-ui-react";

import StateContext, { initialState } from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";
import Routes from "./router";
import rootReducer from "./reducers";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialState as any);

  return (
    <Container>
      <DispatchContext.Provider value={dispatch as any}>
        <StateContext.Provider value={state as any}>
          <Routes />
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Container>
  );
}

export default App;
