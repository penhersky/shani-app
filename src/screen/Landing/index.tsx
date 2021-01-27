import React from 'react';
import {View, Image} from 'react-native';
import {Title, Button, Card, Headline} from 'react-native-paper';

import {landing, useTranslation, global} from '../../translate';

import style from './style';

const Landing = ({navigation}: any) => {
  const {tr} = useTranslation();
  const logo = require('../../assets/logo.png');
  const customer = require('../../assets/customer.png');
  const performer = require('../../assets/performer.png');
  return (
    <View style={style.container}>
      <Image source={logo} style={style.logo} />
      <Headline style={style.mid}>{tr(landing, 'I')}</Headline>
      <View style={style.cards}>
        <Card style={style.card}>
          <Card.Content style={style.content}>
            <Title style={style.text}>{tr(landing, 'customer')}</Title>
            <Image source={customer} style={style.img} />
          </Card.Content>
        </Card>
        <Card style={style.card}>
          <Card.Content style={style.content}>
            <Title style={style.text}>{tr(landing, 'performer')}</Title>
            <Image source={performer} style={style.img} />
          </Card.Content>
        </Card>
      </View>

      <Button style={style.login} onPress={() => navigation.navigate('Login')}>
        {tr(global, 'login')}
      </Button>
    </View>
  );
};

export default Landing;
