import {gql} from '@apollo/client';

export const addContact = gql`
  mutation addProfileContact($contact: CreateContact!) {
    addProfileContact(contact: $contact) {
      id
      name
      value
      icon
      show
    }
  }
`;
