import userReducer, { UserState, UserActionTypes } from "./userReducer";
import movieReducer, { MovieState, MovieActionTypes } from "./movieReducer";

export interface AppState {
  user: UserState;
  movies: MovieState;
}

export type AppActions = UserActionTypes | MovieActionTypes;

export default function rootReducer(
  { user, movies }: AppState,
  action: AppActions
): AppState {
  return {
    user: userReducer(user, action),
    movies: movieReducer(movies, action),
  };
}
