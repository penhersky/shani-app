import {gql} from '@apollo/client';

const getByOrder = gql`
  query getCommentsByOrder($paginate: Paginate!) {
    getCommentsByOrder(paginate: $paginate) {
      result
      totalItems
      page
      totalPages
      comments {
        id
        text
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

const create = gql`
  mutation createComment($comment: InputComment!) {
    createComment(comment: $comment) {
      result
      status
    }
  }
`;

export default {
  create,
  getByOrder,
};
