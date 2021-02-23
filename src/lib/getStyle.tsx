import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const getTaskStatus = (name: string, theme: any) => {
  switch (name) {
    case 'in processing':
      return {
        icon: (
          <Ionicons
            name="time-outline"
            size={40}
            color={theme.colors.primary}
          />
        ),
        color: theme.colors.primary,
      };
    case 'done':
      return {
        icon: <Ionicons name="time-outline" size={40} color={'#ffd591'} />,
        color: '#ffd591',
      };
    case 'closed':
      return {
        icon: <AntDesign name="check" size={40} color={theme.colors.success} />,
        color: theme.colors.success,
      };
    case 'canceled':
      return {
        icon: <AntDesign name="close" size={40} color={theme.colors.error} />,
        color: theme.colors.error,
      };

    default:
      return {
        icon: null,
        color: theme.colors.background,
      };
  }
};

export const getCustomerStatus = (name: string, theme: any) => {
  switch (name) {
    case 'created':
      return {
        icon: null,
        color: theme.colors.background,
      };
    case 'in processing':
      return {
        icon: <Ionicons name="time-outline" size={35} color={'#ffd591'} />,
        color: '#ffd591',
      };
    case 'done':
      return {
        icon: <AntDesign name="check" size={35} color={theme.colors.success} />,
        color: theme.colors.success,
      };

    default:
      return {
        icon: <AntDesign name="check" size={35} color={theme.colors.success} />,
        color: theme.colors.success,
      };
  }
};
