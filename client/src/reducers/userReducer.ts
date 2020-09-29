import { MovieActionTypes } from "./movieReducer";

enum UserActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface UserState {
  isLoggedIn: boolean;
  id?: number;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt?: string;
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
  action: UserActionTypes | MovieActionTypes
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
