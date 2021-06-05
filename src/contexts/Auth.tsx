import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { AuthContextProps, AuthReducerProps } from 'reducers/AuthReducer';

export const AuthContext = createContext<Partial<AuthContextProps>>({});

const AuthProvider = ({
  children,
  reducer,
  initialState,
}: PropsWithChildren<AuthReducerProps>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
