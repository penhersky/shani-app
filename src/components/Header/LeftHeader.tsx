import React from 'react';
import {IconButton} from 'react-native-paper';

const Header = ({navigation}: any) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  return <IconButton onPress={onPressBack} icon="arrow-left" />;
};

export default Header;
