import {gql} from '@apollo/client';

export const shortAccount = gql`
  query getAccount {
    getAccount {
      result
      admin {
        id
        name
        imageUrl
      }
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
      adminToken
    }
  }
`;
