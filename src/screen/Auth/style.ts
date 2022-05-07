import {StyleSheet} from 'react-native';

import {getTheme} from '../../theme';

const style = StyleSheet.create({
  errText: {
    color: getTheme.colors.error,
    textAlign: 'center',
    width: 300,
  },
  input: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },
  button: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },

  buttonError: {
    borderColor: getTheme.colors.error,
    borderWidth: 2,
  },
});

export default style;
