import {gql} from '@apollo/client';

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

export default {
  getUser,
  getMy,
};
