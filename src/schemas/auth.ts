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

export const code = gql`
  query verifyCode($token: String!, $code: String!) {
    verifyCode(token: $token, code: $code) {
      token
      result
      status
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

export const confirmPass = gql`
  mutation confirmRegistration($token: String!, $password: String!) {
    confirmRegistration(token: $token, password: $password) {
      result
    }
  }
`;
