import {SET_NOTIFICATION_COUNT} from '../types/notification';

type Action = {
  type: string;
  count?: number;
};

export type StateType = {
  count: number;
};

export const initialState = {
  count: 0,
};

const notification = (
  state: StateType = initialState,
  action: Action,
): StateType => {
  switch (action.type) {
    case SET_NOTIFICATION_COUNT:
      return {
        ...state,
        count: action.count ?? 0,
      };
    default:
      return state;
  }
};

export default notification;
