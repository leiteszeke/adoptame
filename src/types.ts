import { User } from 'services/users';

export type Generic<T = any> = {
  [key: string]: T;
};

export type RootStackParamList = {
  Chat: { _id: string; other: User };
};
