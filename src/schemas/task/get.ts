import {gql} from '@apollo/client';

export const getMy = gql`
  query getMyOrders($pagination: Paginate!) {
    getMyOrders(pagination: $pagination) {
      result
      page
      totalPages
      orders {
        id
        name
        premium
        payment {
          price
          currency
        }
        visible
        locationType
        status
        createdAt
        comments
        requests
        categories {
          name
        }
        location {
          name
        }
        performer {
          id
          name
          image
        }
        customer {
          id
          name
          image
        }
      }
    }
  }
`;
