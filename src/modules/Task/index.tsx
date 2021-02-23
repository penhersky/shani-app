import React from 'react';
import _ from 'lodash';
import {View, Image} from 'react-native';
import {Text, Card, Divider, TouchableRipple} from 'react-native-paper';
import Gradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {getCustomerStatus, getTaskStatus} from '../../lib/getStyle';
import screens from '../../lib/screens';

import {useTheme} from '../../theme';
import {useTranslation, task} from '../../translate';

import useStyle from './style';

const Task = ({value}: {value: any}) => {
  const navigation = useNavigation();
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);

  const customer = _.get(value, 'customer');
  const performer = _.get(value, 'performer');
  const location = _.get(value, 'location');
  const categories = _.map(_.get(value, 'categories'), (c) => c.name);

  const customerStatus = getCustomerStatus(value.status, theme);
  const taskStatus = getTaskStatus(value.status, theme);

  const onPressPerformer = () => {
    navigation.navigate(screens.userProfile, {userId: performer.id});
  };
  const onPressCustomer = () => {
    navigation.navigate(screens.userProfile, {userId: customer.id});
  };
  const onPressTask = () => {
    navigation.navigate(screens.task, {id: customer.id});
  };

  return (
    <Card style={style.task} onPress={onPressTask}>
      <Gradient
        colors={[theme.colors.surface, taskStatus.color]}
        start={{x: 1.44, y: 1.5}}
        end={{x: 1.69, y: 1.0}}
        style={style.status}>
        {taskStatus.icon}
      </Gradient>

      <Card.Title title={value.name} subtitle={categories.join(' / ')} />
      <Card.Content>
        {customer && (
          <TouchableRipple style={style.user} onPress={onPressCustomer}>
            <>
              <Image source={{uri: customer.image}} style={style.image} />
              <Text style={style.userName}>{customer.name}</Text>
            </>
          </TouchableRipple>
        )}

        {value.price !== 'contractual' ? (
          <Text style={style.price}>{value.price}</Text>
        ) : null}

        {value.locationType === 'online' ? (
          <Text>online</Text>
        ) : location ? (
          <Text>{value.location.name}</Text>
        ) : null}

        <Divider />
        {performer && (
          <Gradient
            style={style.perContainer}
            colors={[theme.colors.surface, customerStatus.color]}
            start={{x: 0.0, y: 1.25}}
            end={{x: 1, y: 15.0}}>
            <TouchableRipple
              style={[style.performer]}
              onPress={onPressPerformer}>
              <>
                <Image source={{uri: performer.image}} style={style.image} />
                <Text style={style.userName}>{performer.name}</Text>
              </>
            </TouchableRipple>
            {customerStatus.icon}
          </Gradient>
        )}
        <Divider />
        <View style={style.footer}>
          <View style={style.section}>
            <AntDesign name="user" size={20} />
            <Text>4</Text>
          </View>
          <View style={style.section}>
            <Icon name="comment" size={20} />
            <Text>12</Text>
          </View>
          <Text>{new Date(Number(value.createdAt)).toLocaleDateString()}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default Task;
