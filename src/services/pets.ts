import { gql } from '@apollo/client';

export const GET_PETS = gql`
  query ($name: String) {
    pets(name: $name) {
      id
      name
      location
      photos
      type {
        name
      }
      like
    }
  }
`;
