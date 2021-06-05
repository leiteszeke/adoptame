import { Dispatch } from 'react';
import { Reducer, ReducerAction } from 'types';

export type User = {
  _id: string;
  name: string;
  lastname: string | null;
  email: string;
};

export type AuthState = {
  user: User | null;
};

export type AuthContextProps = {
  state: AuthState;
  dispatch: Dispatch<ReducerAction<AuthInputState, string>>;
};

export enum AuthReducerAction {
  LOGIN = 'Login',
  LOGOUT = 'Logout',
}

export type AuthInputState = {
  user: User | null;
};

export const authInitialState: AuthState = {
  user: null,
};

export type AuthReducerProps = {
  initialState: AuthState;
  reducer: Reducer<AuthState, ReducerAction<AuthInputState>>;
};

export const AuthReducer = (
  state = authInitialState,
  action: ReducerAction<AuthInputState>,
) => {
  switch (action.type) {
    case AuthReducerAction.LOGIN:
      return {
        ...state,
        user: action.payload?.user ?? state.user ?? null,
      };

    case AuthReducerAction.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return {
        ...state,
      };
  }
};
