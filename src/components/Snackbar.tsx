import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {WhiteOrDark, useTheme} from '../theme';

const Stack = ({
  visible,
  onDismiss,
  children,
  action,
}: {
  visible: boolean;
  onDismiss: () => void;
  children: any;
  action?: {
    label: string;
    accessibilityLabel?: string | undefined;
    onPress: () => void;
  };
}) => {
  const theme = useTheme();
  const style = useStyle(theme);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={200000}
      style={style.container}
      action={action}>
      {children}
    </Snackbar>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backdrop,
      bottom: 10,
    },
  });

export default Stack;
