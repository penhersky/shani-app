import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Image, TouchableOpacity} from 'react-native';
import {Title, Button, Headline} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import {landing, useTranslation, global} from '../../translate';
import {getTheme} from '../../theme';

import {SET_USER_TYPE} from '../../../redux/types/user';

import style from './style';

const Landing = ({navigation}: any) => {
  const {tr} = useTranslation();
  const dispatch = useDispatch();
  const logo = require('../../assets/logo.png');
  const customer = require('../../assets/customer.png');
  const performer = require('../../assets/performer.png');

  const onAuthHandler = (type: string) => {
    navigation.navigate('SingUp', {type});
    dispatch({
      type: SET_USER_TYPE,
      userType: type,
    });
  };

  return (
    <LinearGradient style={style.container} colors={getTheme.colors.gradient}>
      <Image source={logo} style={style.logo} />
      <Headline style={style.mid}>{tr(landing, 'I')}</Headline>
      <View style={style.cards}>
        <TouchableOpacity
          style={style.card}
          onPress={() => onAuthHandler('customer')}>
          <LinearGradient
            colors={getTheme.colors.gradient}
            style={style.content}>
            <Title style={style.text}>{tr(landing, 'customer')}</Title>
            <Image source={customer} style={style.img} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.card}
          onPress={() => onAuthHandler('performer')}>
          <LinearGradient
            colors={getTheme.colors.gradientRevers}
            style={style.content}>
            <Title style={style.text}>{tr(landing, 'performer')}</Title>
            <Image source={performer} style={style.img} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Button
        style={style.login}
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        {tr(global, 'accountExist')}
      </Button>
    </LinearGradient>
  );
};

export default Landing;
