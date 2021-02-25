import {gql} from '@apollo/client';

export const getCommentsByOrder = gql`
  query getCommentsByOrder($paginate: Paginate!) {
    getCommentsByOrder(paginate: $paginate) {
      result
      totalItems
      page
      totalPages
      comments {
        id
        user {
          id
          name
          image
        }
        text
        createdAt
      }
    }
  }
`;

export const createComment = gql`
  mutation createComment($comment: InputComment!) {
    createComment(comment: $comment) {
      result
      status
    }
  }
`;
