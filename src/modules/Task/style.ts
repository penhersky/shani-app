import {StyleSheet} from 'react-native';

import {WhiteOrDark} from '../../theme';

export default (theme: WhiteOrDark) =>
  StyleSheet.create({
    user: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 3,
    },
    userName: {
      marginHorizontal: 10,
    },
    task: {
      margin: 3,
      borderRadius: theme.borderRadius * 3,
      overflow: 'hidden',
    },
    premiumStar: {
      position: 'absolute',
      top: 1,
      left: 1,
    },
    premium: {
      borderRadius: theme.borderRadius,
      borderWidth: 1,
      borderColor: theme.colors.gold,
    },
    image: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },

    price: {
      color: theme.colors.primary,
      marginVertical: 10,
      marginHorizontal: 5,
      fontSize: 20,
    },
    location: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
    },

    perContainer: {
      borderRadius: theme.borderRadius,
      borderWidth: 0.5,
      borderColor: theme.colors.disabled,
      marginVertical: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 7,
    },

    performer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 3,
    },
    status: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 100,
      height: 70,
      opacity: 0.4,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: 5,
    },

    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      paddingBottom: 0,
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: 50,
      padding: 5,
    },
  });
