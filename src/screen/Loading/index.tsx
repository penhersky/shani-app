import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => {
  const img = require('../../assets/logo.png');
  return (
    <View style={style.content}>
      <Image source={img} />
      <ActivityIndicator size={40} style={style.spin} />
    </View>
  );
};

const style = StyleSheet.create({
  spin: {
    position: 'absolute',
    bottom: '30%',
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
