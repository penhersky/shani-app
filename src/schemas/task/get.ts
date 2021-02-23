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
        price
        visible
        locationType
        status
        price
        createdAt
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
