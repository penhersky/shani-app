import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {getTheme} from '../../theme';

const Wrapp = ({
  children,
  title,
  height = 360,
  titleSize = 30,
}: {
  children: any;
  title: string;
  height?: number;
  titleSize?: number;
}) => {
  const navigation = useNavigation();
  const img = require(`../../assets/fon/white.png`);
  const logo = require('../../assets/logo.png');
  return (
    <KeyboardAvoidingView>
      <ImageBackground style={style.img} source={img}>
        <IconButton
          icon={'arrow-left'}
          size={30}
          color={'#000000'}
          onPress={() => navigation.goBack()}
          style={style.back}
        />
        <Image source={logo} style={style.logo} />
        <View style={{...style.container, height}}>
          <Title style={{...style.title, fontSize: titleSize}}>{title}</Title>
          <View style={style.content}>{children}</View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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
    height: '100%',
    top: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    transform: [{scale: 0.8}],
  },
  container: {
    minWidth: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical: 20,
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
    width: 350,
    alignSelf: 'center',
    color: getTheme.colors.primary,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default Wrapp;
