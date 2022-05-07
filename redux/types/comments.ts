import {ShortUser} from './user';

export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT_PAGE = 'ADD_COMMENT_PAGE';
export const SET_PAGE = 'SET_PAGE';

export type Comment = {
  id: string;
  text: string;
  visible: boolean;
  createdAt: string;
  user: ShortUser;
};
