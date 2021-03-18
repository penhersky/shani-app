import _ from 'lodash';

import {
  ADD_COMMENT_PAGE,
  SET_PAGE,
  SET_COMMENTS,
  Comment,
} from '../types/comments';

type Action = {
  type: string;
  id?: string;
  comment?: Comment;
  list?: Comment[];
  page?: number;
  total?: number;
};

export type StateType = {
  list: Comment[];
  page: number;
  total: number;
};

export const initialState = {
  list: [],
  page: 1,
  total: 1,
};

const comment = (
  state: StateType = initialState,
  action: Action,
): StateType => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        list: action.list as Comment[],
        page: 1,
        total: action.total as number,
      };
    case ADD_COMMENT_PAGE:
      return {
        ...state,
        list: [...state.list, ...(action.list as Comment[])],
        total: action.total as number,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page as number,
      };
    default:
      return state;
  }
};

export default comment;
