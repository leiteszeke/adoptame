import { useContext } from 'react';
import { AuthContext } from 'contexts/Auth';

export const useUser = () => {
  const context = useContext(AuthContext);

  return context.state?.user ?? null;
};
