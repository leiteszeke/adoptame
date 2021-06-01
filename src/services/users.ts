import { gql } from '@apollo/client';

export type User = {
  name: string;
  image: string;
  lastname: string | null;
  role: string;
  _id: number;
};

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    name
    lastname
    image
  }
`;
