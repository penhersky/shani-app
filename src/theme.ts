import {DefaultTheme} from 'react-native-paper';

import store from '../redux/store';

export const theme = {
  white: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      accent: '#2A5A63',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      background: '#f6f6f6',
      disabled: 'rgba(0, 0, 0, 0.26)',
      error: '#B00020',
      notification: '#f50057',
      onBackground: '#000000',
      onSurface: '#000000',
      placeholder: 'rgba(0, 0, 0, 0.54)',
      primary: '#2A5A63',
      surface: '#ffffff',
      text: '#000000',
    },
    animation: {
      scale: 1,
    },
  },
  dark: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      accent: '#2A5A63',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      background: '#2F3340',
      disabled: 'rgba(0, 0, 0, 0.26)',
      error: '#B00020',
      notification: '#f50057',
      onBackground: '#000000',
      onSurface: '#000000',
      placeholder: 'rgba(0, 0, 0, 0.54)',
      primary: '#2A5A63',
      surface: '#646979',
      text: '#ffffff',
    },
    animation: {
      scale: 1,
    },
  },
};

export const getTheme = (() => {
  return theme[store.getState().settings.theme];
})();

export const useTheme = () => {
  return theme[store.getState().settings.theme];
};
