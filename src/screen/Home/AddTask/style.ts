import {StyleSheet} from 'react-native';

import {WhiteOrDark} from './../../../theme';

export default (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      padding: 3,
      marginVertical: 3,
    },
  });
