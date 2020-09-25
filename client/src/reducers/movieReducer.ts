import { UserActionTypes } from "./userReducer";

enum MovieActions {
  GET_MOVIES = "GET_MOVIES",
  ADD_MOVIE = "ADD_MOVIE",
}

interface Movie {
  id: number;
  title: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
}

export type MovieState = Movie[];

interface GetMovies {
  type: typeof MovieActions.GET_MOVIES;
  payload: Movie[];
}

interface AddMovie {
  type: typeof MovieActions.ADD_MOVIE;
  payload: Movie;
}

export type MovieActionTypes = GetMovies | AddMovie;

export default function movieReducer(
  state: MovieState,
  action: MovieActionTypes | UserActionTypes
): MovieState {
  switch (action.type) {
    case MovieActions.GET_MOVIES:
      return [...action.payload];
    case MovieActions.ADD_MOVIE:
      return [...state, action.payload];
    default:
      return state;
  }
}
