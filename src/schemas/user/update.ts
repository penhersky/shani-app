import {gql} from '@apollo/client';

export const updateDescription = gql`
  mutation updateDescription($description: String!) {
    updateDescription(description: $description) {
      result
      status
    }
  }
`;
