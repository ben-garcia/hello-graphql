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
      movie!.title = action.payload.title as string;
      movie!.minutes = action.payload.minutes as number;
      return newState;
    default:
      return state;
  }
}
