import {
  Lng,
  ThemeType,
  EventSettings,
  SET_NOTIFICATION,
  SET_APP_STATE,
  SET_LNG,
  SET_THEME,
} from '../types/settings';

type Action = {
  type: string;
  style?: string;
  status?: string;
  lng?: Lng;
  theme?: ThemeType;
  notification?: EventSettings[];
};

export type StateType = {
  style: string;
  status: string;
  lng: Lng;
  theme: ThemeType;
  notification: EventSettings[] | [];
};

export const initialState = {
  style: 'default',
  status: 'production',
  lng: 'en-US' as Lng,
  theme: 'white' as ThemeType,
  notification: [],
};

const settings = (
  state: StateType = initialState,
  action: Action,
): StateType => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        style: action.style as string,
        status: action.status as string,
      };
    case SET_LNG:
      return {
        ...state,
        lng: action.lng as Lng,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme as ThemeType,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.notification as EventSettings[],
      };
    default:
      return state;
  }
};

export default settings;
