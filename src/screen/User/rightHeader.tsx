import React from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../theme';

import Icon from 'react-native-vector-icons/Ionicons';

import {IconButton} from '../../components';

const Header = () => {
  const theme = useTheme();
  const onPress = () => {
    alert('settings');
  };

  return (
    <IconButton
      onPress={onPress}
      styles={style.icon}
      icon={<Icon name="settings-sharp" size={25} color={theme.colors.text} />}
    />
  );
};

const style = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

export default Header;
