import { MovieActionTypes } from "./movieReducer";

enum UserActions {
  LOGIN = "LOGIN",
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

export type UserActionTypes = Login;

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
    default:
      return state;
  }
}
