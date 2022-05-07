import {gql} from '@apollo/client';

import {shortOrder} from './get';

export const create = gql`
  mutation createOrder($order: OrderInput!, $images: [InputOrderImage]) {
    createOrder(order: $order, images: $images) {
      result
      status
      order {
        ${shortOrder}
      }
    }
  }
`;
