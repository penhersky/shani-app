import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Caption} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTheme, WhiteOrDark} from '../../theme';

const Message = ({
  children,
  title,
  body,
  error,
  Icon,
}: {
  children?: any;
  title: string;
  body?: string;
  error?: boolean;
  Icon?: any;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  return (
    <View style={style.container}>
      <View style={style.msg}>
        {Icon ? (
          <Icon size={50} style={[style.icon, error && style.error]} />
        ) : (
          <AntDesign
            size={50}
            style={[style.icon, error && style.error]}
            name={error ? 'closecircleo' : 'warning'}
          />
        )}
        <Title>{title}</Title>
        <Caption>{body}</Caption>
      </View>
      {children}
    </View>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    icon: {
      margin: 5,
      color: theme.colors.primary,
    },
    error: {
      color: theme.colors.error,
    },
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    msg: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  });

export default Message;
