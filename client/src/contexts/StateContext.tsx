import { createContext } from "react";

import { AppState } from "../reducers";

export const initialState: AppState = {
  user: {
    id: 0,
    isLoggedIn: false,
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  movies: [],
};

const StateContext = createContext<AppState>(initialState);

export default StateContext;
