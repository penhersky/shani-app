import {gql} from '@apollo/client';

const getAll = gql`
  query getCategories {
    getCategories {
      id
      name
      icon
      image
      description
      parent
    }
  }
`;

export default {
  getAll,
};
