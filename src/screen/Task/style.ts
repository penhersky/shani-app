import {StyleSheet} from 'react-native';

import {WhiteOrDark} from './../../theme';

export default (theme: WhiteOrDark) =>
  StyleSheet.create({
    taskHat: {
      margin: 3,
      borderRadius: theme.borderRadius * 3,
      overflow: 'hidden',
      zIndex: 0,
    },
    premiumStar: {
      position: 'absolute',
      top: 1,
      left: 1,
    },
  });
