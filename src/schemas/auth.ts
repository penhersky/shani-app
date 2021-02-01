import {gql} from '@apollo/client';

import {capitalize} from '../lib/format';

export const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
      token
    }
  }
`;

export const singUp = (type: string) => gql`
  mutation singUp${capitalize(type)}($email: String!, $name: String!) {
    singUp${capitalize(type)}(email: $email, name: $name) {
      result
      status
      fields
      token
    }
  }
`;
