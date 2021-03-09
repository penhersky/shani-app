import {gql} from '@apollo/client';

/**
 * @param {String} With_capitalize
 * */
export const setStatus = (status: string) => gql`
  mutation setOrderStatusTo${status}($id: ID!) {
    setOrderStatusToDone(id: $id) {
      result
    }
  }
`;

export const cancelPerformer = gql`
  mutation cancelOrderPerformer$($id: ID!) {
    cancelOrderPerformer(id: $id) {
      result
    }
  }
`;

export const performedRefused = gql`
  mutation performedRefused($id: ID!) {
    performedRefused(id: $id) {
      result
    }
  }
`;
