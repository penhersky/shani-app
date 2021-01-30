import {gql} from '@apollo/client';

export const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
      token
    }
  }
`;
