import {gql} from '@apollo/client';

export const shortAccount = gql`
  query getAccount {
    getAccount {
      result
      admin {
        id
        name
        email
        imageUrl
        state
      }
      user {
        id
        name
        type
        email
        images {
          Location
          active
        }
      }
      userToken
      adminToken
      expiresIn
    }
  }
`;
