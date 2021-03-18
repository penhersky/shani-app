import {StyleSheet, Dimensions} from 'react-native';

import {WhiteOrDark} from '../../theme';

export default (theme: WhiteOrDark, me: boolean) =>
  StyleSheet.create({
    message: {
      display: 'flex',
      flexDirection: me ? 'row-reverse' : 'row',
      padding: 5,
      width: Dimensions.get('window').width,
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 5,
      alignItems: me ? 'flex-end' : 'flex-start',
      maxWidth: (Dimensions.get('window').width / 100) * 80,
    },
    text: {
      padding: 7,
      borderColor: theme.colors.primary,
      borderRadius: theme.borderRadius,
      borderWidth: 1,
      alignSelf: me ? 'flex-end' : 'flex-start',
      backgroundColor: theme.colors.surface,
    },
  });
