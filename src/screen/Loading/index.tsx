import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Loading = () => {
  const img = require('../../assets/logo.png');
  return (
    <View style={style.content}>
      <Image source={img} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
