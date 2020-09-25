import { createContext } from "react";

interface User {
  id: number;
  isLoggedIn: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Movie {
  id: number;
  title: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
}

interface State {
  user: User;
  movies: Movie[];
}

export const initialState: State = {
  user: {
    id: 0,
    isLoggedIn: false,
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  movies: [],
};

const StateContext = createContext<State>(initialState);

export default StateContext;
