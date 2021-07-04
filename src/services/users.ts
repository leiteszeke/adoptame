import { gql } from '@apollo/client';

export type User = {
  name: string;
  image: string;
  lastname: string | null;
  role: string;
  _id: string;
};

export type UserWithToken = User & {
  accessToken: string;
};

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    name
    lastname
    image
  }
`;

export const USER_WITH_TOKEN_FRAGMENT = gql`
  fragment UserWithTokenFragment on User {
    ...UserFragment
    accessToken
  }

  ${USER_FRAGMENT}
`;

export const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    user: loginUser(email: $email, password: $password) {
      ...UserWithTokenFragment
    }
  }
  ${USER_WITH_TOKEN_FRAGMENT}
`;

export const REGISTER_USER = gql`
  mutation (
    $name: String!
    $lastname: String
    $email: String!
    $password: String!
  ) {
    user: createUser(
      name: $name
      lastname: $lastname
      email: $email
      password: $password
    ) {
      ...UserWithTokenFragment
    }
  }
  ${USER_WITH_TOKEN_FRAGMENT}
`;
