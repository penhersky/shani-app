import {gql} from '@apollo/client';

export const getRequestByOrder = gql`
  query getRequestsByOrder($id: ID!, $paginate: Paginate!) {
    getRequestsByOrder(id: $id, paginate: $paginate) {
      result
      totalItems
      page
      totalPages
      requests {
        id
        text
        price
        time
        visible
        createdAt
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export const createRequest = gql`
  mutation createRequest($request: CreatePerformerRequest!) {
    createRequest(request: $request) {
      result
      status
    }
  }
`;
