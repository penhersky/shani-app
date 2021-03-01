import {gql} from '@apollo/client';

export const shortOrder = `
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
        customerRating {
          id
          score
        }
        performerRating {
          id
          score
        }
`;

export const getMy = gql`
  query getMyOrders($pagination: Paginate!) {
    getMyOrders(pagination: $pagination) {
      result
      page
      totalPages
      orders {
      ${shortOrder}
      }
    }
  }
`;

export const getOrder = gql`
  query getOrder($id: ID!) {
    getOrder(id: $ids) {
      result
      status
      order {
        id
        name
        description
        premium
        visible
        status
        customerRating {
          id
          score
        }
        performerRating {
          id
          score
        }

        comments
        requests

        createdAt
        images {
          id
          Key
          Location
        }
        payment {
          price
          currency
        }
        categories {
          id
          name
        }
        locationType
        location {
          name
          lat
          lng
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
