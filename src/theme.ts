import {get} from 'lodash';
import {useSelector} from 'react-redux';
import {DefaultTheme} from 'react-native-paper';

import store from '../redux/store';

export const theme = {
  white: {
    ...DefaultTheme,
    myOwnProperty: true,
    name: 'white',
    colors: {
      accent: '#c4e0e5',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      background: '#f6f6f6',
      disabled: 'rgba(0, 0, 0, 0.26)',
      error: '#B00020',
      success: '#23D18BFF',
      gold: '#FFD700FF',
      notification: '#f50057',
      onBackground: '#000000',
      onSurface: '#000000',
      placeholder: 'rgba(0, 0, 0, 0.54)',
      primary: '#4CA1AF',
      surface: '#ffffff',
      text: '#000000',
      gradient: ['#C4E0E575', '#4ca1af'],
      gradientRevers: ['#A1DBE5FF', '#56B6C5FF'],
    },
    margin: 1,
    padding: 3,
    borderRadius: 3,
    animation: {
      scale: 1,
    },
  },
  dark: {
    ...DefaultTheme,
    myOwnProperty: true,
    name: 'dark',
    colors: {
      accent: '#c4e0e5',
      backdrop: '#E3E3E3FF',
      background: '#3C4152',
      disabled: 'rgba(0, 0, 0, 0.26)',
      error: '#B00020',
      success: '#23D18BFF',
      gold: '#FFD700FF',
      notification: '#f50057',
      onBackground: '#000000',
      onSurface: '#000000',
      placeholder: '#E3E3E3FF',
      primary: '#4ca1af',
      surface: '#303441',
      text: '#F1F1F1',
      gradient: ['#C4E0E575', '#4ca1af'],
      gradientRevers: ['#4ca1af', '#C4E0E575'],
    },
    margin: 1,
    padding: 3,
    borderRadius: 7,
    animation: {
      scale: 1,
    },
  },
};

export const getTheme = (() => {
  return theme[store.getState().settings.theme];
})();

export const useTheme = (): WhiteOrDark => {
  const {theme: mode} = useSelector((state: any) => state.settings);
  return get(theme, mode);
};

export const navigationTheme = (gtheme: any) => ({
  colors: {
    primary: gtheme.colors.primary,
    background: gtheme.colors.background,
    card: gtheme.colors.surface,
    text: gtheme.colors.text,
    border: gtheme.colors.backdrop,
    notification: 'rgb(255, 69, 58)',
  },
});

export interface Theme {
  white: WhiteOrDark;
  dark: WhiteOrDark;
}
export interface WhiteOrDark {
  myOwnProperty: boolean;
  name: string;
  colors: Colors;
  margin: number;
  padding: number;
  borderRadius: number;
  animation: Animation;
}
export interface Colors {
  accent: string;
  backdrop: string;
  background: string;
  disabled: string;
  error: string;
  success: string;
  gold: string;
  notification: string;
  onBackground: string;
  onSurface: string;
  placeholder: string;
  primary: string;
  surface: string;
  text: string;
  gradient?: string[] | null;
  gradientRevers?: string[] | null;
}
export interface Animation {
  scale: number;
}
