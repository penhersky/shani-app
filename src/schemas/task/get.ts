import {gql} from '@apollo/client';

export const getMy = gql`
  query getMyOrders($pagination: Paginate!) {
    getMyOrders(pagination: $pagination) {
      result
      page
      orders {
        id
        name
        price
        visible
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
      }
    }
  }
`;
