import { User } from 'services/users';

export type Generic<T = any> = {
  [key: string]: T;
};

export type RootStackParamList = {
  Chat: { _id: string; other: User };
};

export type Reducer<S, A> = (prevState: S, action: A) => S;

export type ReducerAction<P, T = string> = {
  type: T;
  payload?: Partial<P>;
};

export type NonColorableSVG = {
  height?: number;
  width?: number;
};
