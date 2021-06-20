import { createRef } from 'react';
import { Generic } from 'types';

export const navigationRef: any = createRef();

export const navigate = (name: string, params?: Generic) => {
  navigationRef.current?.navigate(name, params);
};
