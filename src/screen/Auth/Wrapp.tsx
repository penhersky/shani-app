import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {getTheme} from '../../theme';

const Wrapp = ({
  children,
  title,
  height = 360,
}: {
  children: any;
  title: string;
  height?: number;
}) => {
  const navigation = useNavigation();
  const img = require('../../assets/fon.png');
  const logo = require('../../assets/logo.png');
  return (
    <View>
      <ImageBackground style={style.img} source={img}>
        <IconButton
          icon={'arrow-left'}
          size={30}
          color={'#000000'}
          onPress={() => navigation.goBack()}
          style={style.back}
        />
        <Image source={logo} style={style.logo} />
        <LinearGradient
          style={{...style.container, height}}
          colors={['#C4E0E575', '#4CA1AFDA']}>
          <Title style={style.title}>{title}</Title>
          <View style={style.content}>{children}</View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  img: {
    width: '100%',
    height: 800,
    top: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 100,
    transform: [{scale: 0.8}],
  },
  container: {
    minWidth: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical: 20,
    borderRadius: getTheme.borderRadius,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20,
    flexDirection: 'column',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    color: getTheme.colors.primary,
  },
});

export default Wrapp;
