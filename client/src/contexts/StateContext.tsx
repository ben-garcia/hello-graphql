import { createContext } from "react";

import { AppState } from "../reducers";

export const initialState: AppState = {
  comments: [],
  movies: [],
  user: {
    id: "0",
    isLoggedIn: false,
    email: "",
    createdAt: "",
    updatedAt: "",
  },
};

const StateContext = createContext<AppState>(initialState);

export default StateContext;
