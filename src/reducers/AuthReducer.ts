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
  dispatch: Dispatch<ReducerAction<AuthInputState, string>>;
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
  reducer: Reducer<AuthState, ReducerAction<AuthInputState>>;
};

export const AuthReducer = async (
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
      const user = await getSession();

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
