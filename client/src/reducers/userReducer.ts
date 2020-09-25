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

export interface UserActionsTypes {
  type: typeof UserActions.LOGIN;
  payload: User;
}

export default function userReducer(
  state: UserState,
  action: UserActionsTypes
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
