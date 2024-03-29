export const SET_APP_STATE = 'SET_APP_STATE';
export const SET_THEME = 'SET_THEME';
export const SET_LNG = 'SET_LNG';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export enum ThemeType {
  dark = 'dark',
  white = 'white',
}

export enum Lng {
  en = 'en-US',
  ru = 'ru-RU',
  ua = 'ua-UA',
}

export const languages = ['en-US', 'ru-RU', 'ua-UA'];

export type EventSettings = {
  key: String;
  value: boolean;
};
