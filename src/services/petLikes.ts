import { gql } from '@apollo/client';
import { PET_FRAGMENT } from './pets';

export const CREATE_PET_LIKE = gql`
  mutation ($petId: ID!) {
    pet: createPetLike(petId: $petId) {
      ...PetFragment
    }
  }

  ${PET_FRAGMENT}
`;

export const DELETE_PET_LIKE = gql`
  mutation ($petId: ID!) {
    pet: deletePetLike(petId: $petId) {
      ...PetFragment
    }
  }
  ${PET_FRAGMENT}
`;
