import {gql} from '@apollo/client';

export const shortAccount = gql`
  query getAccount {
    getAccount {
      result
      user {
        id
        name
        type
        images {
          Location
          active
        }
      }
      userToken
    }
  }
`;
