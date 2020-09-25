import userReducer, { UserState, UserActionsTypes } from "./userReducer";
import movieReducer, { MovieState, MovieActionsTypes } from "./movieReducer";

interface AppState {
  user: UserState;
  movies: MovieState;
}

type AppActions = UserActionsTypes | MovieActionsTypes;

export default function rootReducer(
  state: AppState,
  action: AppActions
): AppState {
  return {
    user: userReducer(state.user, action as any),
    movies: movieReducer(state.movies, action as any),
  };
}
