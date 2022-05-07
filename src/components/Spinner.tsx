import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {useTheme} from '../theme';

const Spinner = ({
  size,
  absolute,
  styles,
}: {
  size?: number;
  absolute?: boolean;
  styles?: any;
}) => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      animating={true}
      color={theme.colors.primary}
      size={size ? size : 'small'}
      style={absolute && [style.spinner, styles]}
    />
  );
};

const style = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
});

export default Spinner;
