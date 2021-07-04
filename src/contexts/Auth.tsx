import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';
import {
  AuthContextProps,
  AuthReducerAction,
  AuthReducerProps,
} from 'reducers/AuthReducer';

export const AuthContext = createContext<Partial<AuthContextProps>>({});

const AuthProvider = ({
  children,
  reducer,
  initialState,
}: PropsWithChildren<AuthReducerProps>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(AuthReducerAction.INIT);
  }, []);

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
