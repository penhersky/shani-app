import React from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {View} from 'react-native';
import {Text, Card, TouchableRipple} from 'react-native-paper';
import Gradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {getPerformerStyles, getTaskStatus} from '../../lib/getStyle';
import screens from '../../lib/screens';

import {Rating, Avatar, Price} from '../../components';
import Vote from '../vote';

import {useTheme} from '../../theme';
import useStyle from './style';

const Task = ({value}: {value: any}) => {
  const navigation = useNavigation();
  const {user, type} = useSelector((state: any) => state.user);
  const theme = useTheme();
  const style = useStyle(theme);

  const customer = _.get(value, 'customer');
  const performer = _.get(value, 'performer');
  const location = _.get(value, 'location');
  const payment = _.get(value, 'payment');
  const categories = _.map(_.get(value, 'categories'), (c) => c.name);
  const isCostumer = user.id === customer?.id;
  const isPerformer = user.id === performer?.id;
  const involved = isCostumer || user.id === isPerformer;

  const customerStatus = getPerformerStyles(value.status, theme);
  const taskStatus = getTaskStatus(value.status, theme);

  const onPressPerformer = () => {
    navigation.navigate(screens.userProfile, {userId: performer.id});
  };
  const onPressCustomer = () => {
    navigation.navigate(screens.userProfile, {userId: customer.id});
  };
  const onPressTask = () => {
    navigation.navigate(screens.task, {task: {...value, categories}});
  };

  return (
    <Card
      style={[style.task, value.premium && style.premium]}
      onPress={onPressTask}>
      <Gradient
        colors={[theme.colors.surface, taskStatus.color]}
        start={{x: 1.44, y: 1.5}}
        end={{x: 1.69, y: 1.0}}
        style={style.status}>
        {taskStatus.icon}
      </Gradient>

      {value.premium && (
        <Icon
          name="star"
          style={style.premiumStar}
          size={14}
          color={theme.colors.gold}
        />
      )}

      <Card.Title title={value.name} subtitle={categories.join(' / ')} />
      <Card.Content>
        {customer.id !== user.id && (
          <TouchableRipple style={style.user} onPress={onPressCustomer}>
            <>
              <Avatar size={30} name={customer.name} image={customer.image} />
              <View style={style.userName}>
                <Text>{customer.name}</Text>
                {_.get(value, 'customerRating') && (
                  <Rating
                    value={_.get(value, 'customerRating')?.score}
                    size={12}
                  />
                )}
              </View>
            </>
          </TouchableRipple>
        )}

        {payment.price ? <Price payment={payment} size={20} /> : null}

        <View style={style.location}>
          {value.locationType === 'online' ? (
            <>
              <Icon name="circle" color={theme.colors.error} />
              <Text>online</Text>
            </>
          ) : location.name ? (
            <>
              <Icon name="location-pin" size={16} style={style.icon} />
              <Text>{value.location.name}</Text>
            </>
          ) : null}
        </View>

        {performer && performer?.id !== user?.id && involved && (
          <Gradient
            style={style.perContainer}
            colors={[theme.colors.surface, customerStatus.color]}
            start={{x: 0.0, y: 1.25}}
            end={{x: 1, y: 15.0}}>
            <TouchableRipple
              style={[style.performer]}
              onPress={onPressPerformer}>
              <>
                <Avatar
                  size={30}
                  name={performer.name}
                  image={performer.image}
                />

                <View style={style.userName}>
                  <Text>{performer.name}</Text>
                  {_.get(value, 'performerRating') && (
                    <Rating
                      value={_.get(value, 'performerRating')?.score}
                      size={12}
                    />
                  )}
                </View>
              </>
            </TouchableRipple>
            {customerStatus.icon}
          </Gradient>
        )}
        <View style={style.footer}>
          <View style={style.section}>
            <AntDesign name="user" size={20} style={style.icon} />
            <Text>{value.requests}</Text>
          </View>
          <View style={style.section}>
            <Icon name="comment" size={20} style={style.icon} />
            <Text>{value.comments}</Text>
          </View>
          <Text>{new Date(Number(value.createdAt)).toLocaleDateString()}</Text>
        </View>
        {['done', 'closed'].includes(value.status) && performer && (
          <Vote
            size={35}
            score={_.get(value, `${type}Rating`)?.score}
            id={value.id}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default Task;
