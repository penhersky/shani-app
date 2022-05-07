import {filter} from 'lodash';

import {Category, SET_CATEGORIES} from '../types/categories';

type Action = {
  type: string;
  categories?: Category[];
};

export type StateType = {
  categories: Category[] | [];
  mainCategories: Category[] | [];
};

export const initialState = {
  categories: [],
  mainCategories: [],
};

const categories = (
  state: StateType = initialState,
  action: Action,
): StateType => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        mainCategories: filter(action.categories, (value) => !value.parent),
      };
    default:
      return state;
  }
};

export default categories;
