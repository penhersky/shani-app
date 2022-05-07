import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useTheme} from '../../theme';

import {AntDesign, MaterialIcons} from '../../lib/icon';

import {IconButton} from '../../components';

const Header = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => {
    alert('settings');
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={style.header}>
      <IconButton
        onPress={onPressBack}
        styles={style.icon}
        icon={
          <AntDesign name="arrowleft" size={25} color={theme.colors.text} />
        }
      />
      <IconButton
        onPress={onPress}
        styles={style.icon}
        icon={
          <MaterialIcons name="more-vert" size={25} color={theme.colors.text} />
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 5,
    paddingVertical: 15,
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

export default Header;
