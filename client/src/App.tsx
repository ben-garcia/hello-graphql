import React, { useReducer } from "react";
import { Container } from "semantic-ui-react";

import StateContext, { initialState } from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";
import rootReducer, { AppState, AppActions } from "./reducers";
import Routes from "./router";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppActions>>(
    rootReducer,
    initialState
  );

  return (
    <Container>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Routes />
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Container>
  );
}

export default App;
