import React from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Avatar, Title, Card} from 'react-native-paper';

import {useTheme, WhiteOrDark} from '../../theme';

import {avatarText} from '../../lib/format';

const Hat = ({
  header,
  name,
  images,
}: {
  header: any;
  name: string;
  images: any[];
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {theme: mode} = useSelector((state: any) => state.settings);
  const dark = require('../../assets/fon/user-dark.png');
  const white = require('../../assets/fon/user-white.png');
  const uri = _.get(_.find(images ?? [], {active: true}), 'Location');

  return (
    <Card style={style.hat}>
      <ImageBackground
        style={style.back}
        imageStyle={{resizeMode: 'cover', alignSelf: 'center'}}
        source={mode === 'white' ? white : dark}>
        {header}
      </ImageBackground>
      {uri ? (
        <Avatar.Image size={150} source={{uri}} style={style.avatar} />
      ) : (
        <Avatar.Text size={150} label={avatarText(name)} style={style.avatar} />
      )}
      <View style={style.info}>
        <Title>{name}</Title>
      </View>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    hat: {
      height: 220,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderBottomColor: theme.colors.primary,
    },
    back: {
      height: 160,
    },
    avatar: {position: 'absolute', top: 30, alignSelf: 'center'},
    info: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 5,
    },
  });

export default Hat;
