import React from 'react';
import {Image, View} from 'react-native';

const Header = () => {
  const img = require('../../assets/logo.png');

  return (
    <View>
      <Image source={img} style={{transform: [{scale: 0.5}]}} />
    </View>
  );
};

export default Header;
