import React from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Title, Card} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import {useTheme, WhiteOrDark} from '../../theme';
import {Avatar} from '../../components';

const Hat = ({
  header,
  name,
  images,
  loading,
}: {
  header: any;
  name: string;
  images: any[];
  loading: boolean;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {theme: mode} = useSelector((state: any) => state.settings);
  const dark = require('../../assets/fon/user-dark.png');
  const white = require('../../assets/fon/user-white.png');
  const uri = _.get(_.find(images ?? [], {active: true}), 'Location');

  if (loading && !name) {
    return (
      <Skeleton
        backgroundColor={theme.colors.background}
        highlightColor={theme.colors.accent}>
        <Skeleton.Item width="100%" height={220} />
      </Skeleton>
    );
  }

  return (
    <Card style={style.hat}>
      <ImageBackground
        style={style.back}
        imageStyle={style.img}
        source={mode === 'white' ? white : dark}>
        {header}
      </ImageBackground>
      <Avatar name={name} size={150} image={uri} styles={style.avatar} />
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
    img: {
      resizeMode: 'cover',
      alignSelf: 'center',
      borderRadius: 20,
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
