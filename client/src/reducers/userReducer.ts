import { MovieActionTypes, Movie } from "./movieReducer";
import { CommentActionTypes } from "./commentReducer";

enum UserActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface UserState {
  isLoggedIn: boolean;
  id?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  movies: Movie[];
}

interface Login {
  type: typeof UserActions.LOGIN;
  payload: User;
}

interface Logout {
  type: typeof UserActions.LOGOUT;
}

export type UserActionTypes = Login | Logout;

export default function userReducer(
  state: UserState,
  action: CommentActionTypes | UserActionTypes | MovieActionTypes
): UserState {
  switch (action.type) {
    case UserActions.LOGIN:
      return {
        ...action.payload,
        isLoggedIn: true,
      };
    case UserActions.LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
