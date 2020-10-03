import { UserActionTypes } from "./userReducer";

enum MovieActions {
  GET_MOVIES = "GET_MOVIES",
  ADD_MOVIE = "ADD_MOVIE",
  DELETE_MOVIE = "DELETE_MOVIE",
  MODIFY_MOVIE = "MODIFY_MOVIE",
}

export interface Movie {
  id: number;
  title: string;
  url: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
  };
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

interface ModifyMovie {
  type: typeof MovieActions.MODIFY_MOVIE;
  payload: Partial<Movie>;
}

export type MovieActionTypes = GetMovies | AddMovie | DeleteMovie | ModifyMovie;

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
    case MovieActions.MODIFY_MOVIE:
      // eslint-disable-next-line
			const newState = [...state];
      // eslint-disable-next-line
      const movie = newState.find((m: Movie) => m.id === action.payload.id);
      // eslint-disable-next-line
      const index = newState.findIndex(
        (m: Movie) => m.id === action.payload.id
      );
      // eslint-disable-next-line
      const newMovie: any = { ...movie };
      newMovie.title = action.payload.title;
      newMovie.url = action.payload.url;
      newMovie.minutes = action.payload.minutes;
      newState.splice(index, 1, newMovie);
      return newState;
    default:
      return state;
  }
}
