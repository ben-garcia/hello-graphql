import userReducer, { UserState, UserActionTypes } from "./userReducer";
import movieReducer, { MovieState, MovieActionTypes } from "./movieReducer";
import commentReducer, {
  CommentState,
  CommentActionTypes,
} from "./commentReducer";

export interface AppState {
  comments: CommentState;
  user: UserState;
  movies: MovieState;
}

export type AppActions =
  | UserActionTypes
  | MovieActionTypes
  | CommentActionTypes;

export default function rootReducer(
  { comments, user, movies }: AppState,
  action: AppActions
): AppState {
  return {
    comments: commentReducer(comments, action),
    movies: movieReducer(movies, action),
    user: userReducer(user, action),
  };
}
