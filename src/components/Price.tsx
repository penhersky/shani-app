import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import {useTheme, WhiteOrDark} from '../theme';

const User = ({
  payment,
  styles,
  size,
}: {
  payment: {
    price: string;
    currency: string;
  };
  styles?: any;
  size?: number;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  return (
    <Text style={[style.price, styles, {fontSize: size}]}>
      {payment.price} {payment.currency}
    </Text>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    price: {
      color: theme.colors.primary,
      marginVertical: 10,
      marginHorizontal: 5,
      fontSize: 20,
    },
  });

export default User;
