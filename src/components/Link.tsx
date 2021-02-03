import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Link = ({
  to,
  params,
  children,
}: {
  to: string;
  params?: any;
  children: any;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableRipple onPress={() => navigation.navigate(to, params)}>
      {children}
    </TouchableRipple>
  );
};

export default Link;
