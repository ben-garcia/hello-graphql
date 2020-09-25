enum MovieActions {
  GET_MOVIES = "GET_MOVIES",
  ADD_MOVIE = "ADD_MOVIE",
}

interface Movie {
  id: number;
  tltle: string;
  minutes: number;
  createdAt: string;
  updatedAt: string;
}

export type MovieState = Movie[];

export type MovieActionsTypes =
  | {
      type: typeof MovieActions.GET_MOVIES;
      payload: Movie[];
    }
  | { type: typeof MovieActions.ADD_MOVIE; payload: Movie };

export default function movieReducer(
  state: MovieState,
  action: MovieActionsTypes
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
