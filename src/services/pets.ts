import { gql } from '@apollo/client';

export const PET_FRAGMENT = gql`
  fragment PetFragment on Pet {
    id
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
      id
      name
      image
    }
  }
`;

export type Pet = {
  id: string;
  name: string;
  location: string;
  photos: string[];
  birth: number;
  description?: string;
  publishedAt: number;
  owner: {
    name: string;
    image: string;
    role: string;
    id: number;
  };
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
