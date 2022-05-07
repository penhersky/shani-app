import {gql} from '@apollo/client';

import {capitalize} from '../lib/format';

const getUser = gql`
  query getUserAverage($id: ID!) {
    getUserAverage(id: $id) {
      score
      count
      group {
        score
        count
      }
    }
  }
`;

const getMy = gql`
  query getMyAverage {
    getMyAverage {
      score
      count
      group {
        score
        count
      }
    }
  }
`;

const addRatingFrom = (type: string) => gql`
  mutation addRatingFrom${capitalize(type)}($score: Float!, $order: ID!) {
    addRatingFrom${capitalize(type)}(score: $score, order: $order) {
      result
    }
  }
`;

export default {
  getUser,
  getMy,
  addRatingFrom,
};
