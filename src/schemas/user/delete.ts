import {gql} from '@apollo/client';

export const deleteContact = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      result
    }
  }
`;
