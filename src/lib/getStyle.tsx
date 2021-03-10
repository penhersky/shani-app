import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const getTaskStatus = (name: string, theme: any, size = 40) => {
  switch (name) {
    case 'in processing':
      return {
        icon: (
          <Ionicons
            name="time-outline"
            size={size}
            color={theme.colors.primary}
          />
        ),
        color: theme.colors.primary,
      };
    case 'done':
      return {
        icon: <Ionicons name="time-outline" size={size} color={'#ffd591'} />,
        color: '#ffd591',
      };
    case 'closed':
      return {
        icon: (
          <AntDesign name="check" size={size} color={theme.colors.success} />
        ),
        color: theme.colors.success,
      };
    case 'canceled':
      return {
        icon: <AntDesign name="close" size={size} color={theme.colors.error} />,
        color: theme.colors.error,
      };

    default:
      return {
        icon: null,
        color: theme.colors.surface,
      };
  }
};

export const getPerformerStyles = (name: string, theme: any, size = 35) => {
  switch (name) {
    case 'created':
      return {
        icon: null,
        color: theme.colors.background,
      };
    case 'in processing':
      return {
        icon: <Ionicons name="time-outline" size={size} color={'#ffd591'} />,
        color: '#ffd591',
      };
    case 'done':
      return {
        icon: (
          <AntDesign name="check" size={size} color={theme.colors.success} />
        ),
        color: theme.colors.success,
      };

    default:
      return {
        icon: (
          <AntDesign name="check" size={size} color={theme.colors.success} />
        ),
        color: theme.colors.success,
      };
  }
};
