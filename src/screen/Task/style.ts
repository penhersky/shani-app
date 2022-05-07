import {StyleSheet} from 'react-native';

import {WhiteOrDark} from './../../theme';

export default (theme: WhiteOrDark) =>
  StyleSheet.create({
    more: {
      position: 'absolute',
      top: 7,
      right: 7,
      zIndex: 1,
      padding: 3,
    },
    taskHat: {
      margin: 3,
      borderRadius: theme.borderRadius * 3,
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: theme.colors.surface,
      padding: 5,
    },
    premiumStar: {
      position: 'absolute',
      top: 1,
      left: 1,
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    action: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      borderRadius: theme.borderRadius,
      flex: 1,
      flexDirection: 'row',
    },
    margin: {
      marginHorizontal: 10,
    },
  });
