import _ from 'lodash';

import {ADD_TASKS_PAGE, SET_PAGE, SET_TASKS, PUT_TASK} from '../types/task';

type Action = {
  type: string;
  id?: string;
  task?: any;
  list?: any[];
  page?: number;
  total?: number;
};

export type StateType = {
  list: any[];
  page: number;
  total: number;
};

export const initialState = {
  list: [],
  page: 1,
  total: 1,
};

const task = (state: StateType = initialState, action: Action): StateType => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        list: action.list as any[],
        page: 1,
        total: action.total as number,
      };
    case ADD_TASKS_PAGE:
      return {
        ...state,
        list: [...state.list, ...(action.list as any[])],
        total: action.total as number,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page as number,
      };
    case PUT_TASK:
      return {
        ...state,
        list: _.map(state.list, (item: any) =>
          item.id === action.id ? {...item, ...action.task} : item,
        ),
      };
    default:
      return state;
  }
};

export default task;
