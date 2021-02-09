import {gql} from '@apollo/client';

export const fullAccount = gql`
  query getAccount($id: ID!) {
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
