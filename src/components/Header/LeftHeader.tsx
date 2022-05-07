import React from 'react';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  return <IconButton onPress={onPressBack} icon="arrow-left" />;
};

export default Header;
