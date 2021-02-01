import {StyleSheet} from 'react-native';

import {getTheme} from '../../theme';

const style = StyleSheet.create({
  errText: {
    color: getTheme.colors.error,
    textAlign: 'center',
  },
  input: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },
  button: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },
});

export default style;
