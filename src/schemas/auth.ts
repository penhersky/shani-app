import {gql} from '@apollo/client';

export const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
      token
    }
  }
`;

export const singUp = (type: string) => gql`
  mutation singUp${
    type.charAt(0).toUpperCase() + type.slice(1)
  }($email: String!, $name: String!) {
    login(email: $email, name: $name) {
      result
      status
      fields
      token
    }
  }
`;
