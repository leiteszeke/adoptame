import { gql } from '@apollo/client';
import { User, USER_FRAGMENT } from './users';

export const PET_FRAGMENT = gql`
  fragment PetFragment on Pet {
    _id
    name
    location
    photos
    birth
    publishedAt
    type {
      name
      image
    }
    like
    owner {
      ...UserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export type Pet = {
  _id: string;
  name: string;
  location: string;
  photos: string[];
  birth: number;
  description?: string;
  publishedAt: number;
  owner: User;
  type: {
    name: string;
    image: string;
  };
  like: boolean;
};

export const GET_PETS = gql`
  query ($name: String, $like: Boolean) {
    pets(name: $name, like: $like) {
      ...PetFragment
    }
  }

  ${PET_FRAGMENT}
`;
