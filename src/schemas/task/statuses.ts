import {gql} from '@apollo/client';

/**
 * @param {String} With_capitalize
 * */
export const setStatus = gql`
  mutation setOrderStatus($id: ID!, $status: String!) {
    setOrderStatus(id: $id, status: $status) {
      result
    }
  }
`;

export const cancelPerformer = gql`
  mutation cancelOrderPerformer($id: ID!) {
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
