import { clearSession, getSession, setSession } from 'helpers/session';
import { Dispatch } from 'react';
import { UserWithToken } from 'services/users';
import { Reducer, ReducerAction } from 'types';

export type User = {
  _id: string;
  name: string;
  lastname: string | null;
  email: string;
};

export type AuthState = {
  user: UserWithToken | null;
};

export type AuthContextProps = {
  state: AuthState;
  dispatch: Dispatch<ReducerAction<AuthInputState, AuthReducerAction>>;
};

export enum AuthReducerAction {
  LOGIN = 'Login',
  LOGOUT = 'Logout',
  INIT = 'Init',
}

export type AuthInputState = {
  user: UserWithToken | null;
};

export const authInitialState: AuthState = {
  user: null,
};

export type AuthReducerProps = {
  initialState: AuthState;
  reducer: Reducer<AuthState, ReducerAction<AuthInputState, AuthReducerAction>>;
};

export const AuthReducer = (
  state = authInitialState,
  action: ReducerAction<AuthInputState>,
) => {
  switch (action.type) {
    case AuthReducerAction.LOGIN:
      setSession(action.payload?.user ?? state.user ?? null);

      return {
        ...state,
        user: action.payload?.user ?? state.user ?? null,
      };

    case AuthReducerAction.LOGOUT:
      clearSession();

      return {
        ...state,
        user: null,
      };

    case AuthReducerAction.INIT:
      const user = getSession();

      return {
        ...state,
        user: user ?? null,
      };

    default:
      return {
        ...state,
      };
  }
};
