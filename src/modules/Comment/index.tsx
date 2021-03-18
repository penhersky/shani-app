import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {getPerformerStyles, getTaskStatus} from '../../lib/getStyle';
import screens from '../../lib/screens';

import {useTheme} from '../../theme';
import useStyle from './style';

const Comment = ({value}: {value: any}) => {
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.user);
  const theme = useTheme();
  const style = useStyle(theme);

  const involved = _.get(value, 'user.id') === user.id;

  return (
    <View>
      <Text>{value.text}</Text>
    </View>
  );
};

export default Comment;
