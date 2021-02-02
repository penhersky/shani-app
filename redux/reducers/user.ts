import {get} from 'lodash';

import {
  SET_SHORT_USER,
  SET_USER,
  SET_ADMIN,
  User,
  Admin,
  SET_USER_TYPE,
} from '../types/user';

type Action = {
  type: string;
  user?: User;
  admin?: Admin;
  userType?: string;
};

export type StateType = {
  user: User | {};
  type?: string;
  admin?: Admin;
};

export const initialState = {
  user: {
    id: '',
    name: '',
    image: '',
  },
  type: 'customer',
};

const user = (state: StateType = initialState, action: Action): StateType => {
  switch (action.type) {
    case SET_SHORT_USER:
      return {
        ...state,
        user: {
          ...action.user,
          id: get(action.user, 'id'),
          name: get(action.user, 'name'),
          image: get(action.user, 'image'),
        },
        type: get(action.user, 'type'),
      };
    case SET_USER_TYPE:
      return {
        ...state,
        type: action.userType,
      };
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.user,
        },
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
        type: 'admin',
      };
    default:
      return state;
  }
};

export default user;
