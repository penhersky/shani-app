import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Text, Caption, Subheading} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Avatar} from '../../components';
import screens from '../../lib/screens';
import {date} from '../../lib/format';

import {useTheme} from '../../theme';
import useStyle from './style';

const Message = ({value}: {value: any}) => {
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.user);
  const theme = useTheme();

  const involved = _.get(value, 'user.id') === user.id;
  const owner = _.get(value, 'user');

  const style = useStyle(theme, involved);

  return (
    <View style={style.message}>
      <Avatar size={30} name={owner.name} image={owner.image} />
      <View style={style.info}>
        <Subheading>{owner.name}</Subheading>
        <View style={style.text}>
          <Text>{value.text}</Text>
        </View>
        <Caption>{date(value.createdAt)}</Caption>
      </View>
    </View>
  );
};

export default Message;
