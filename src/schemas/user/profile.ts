import {gql} from '@apollo/client';

export const fullAccount = gql`
  query getAccount($id: String!) {
    getUser(id: $id) {
      result
      status
      user {
        id
        name
        type
        email
        firstName
        lastName
        middleName
        description
        birthday
        categoriesId
        contacts {
          id
          name
          value
          icon
          show
        }
        images {
          Location
          active
        }
        location {
          name
          lat
          lng
        }
        accountType {
          status
          from
          to
        }
      }
    }
  }
`;
