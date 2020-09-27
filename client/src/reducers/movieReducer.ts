import { UserActionTypes } from "./userReducer";

enum MovieActions {
  GET_MOVIES = "GET_MOVIES",
  ADD_MOVIE = "ADD_MOVIE",
  DELETE_MOVIE = "DELETE_MOVIE",
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

interface DeleteMovie {
  type: typeof MovieActions.DELETE_MOVIE;
  payload: number;
}

export type MovieActionTypes = GetMovies | AddMovie | DeleteMovie;

export default function movieReducer(
  state: MovieState,
  action: MovieActionTypes | UserActionTypes
): MovieState {
  switch (action.type) {
    case MovieActions.GET_MOVIES:
      return [...action.payload];
    case MovieActions.ADD_MOVIE:
      return [...state, action.payload];
    case MovieActions.DELETE_MOVIE:
      return state.filter((movie: Movie) => movie.id !== action.payload);
    default:
      return state;
  }
}
