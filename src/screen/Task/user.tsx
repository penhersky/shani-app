import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Subheading, Card} from 'react-native-paper';

import {useTheme, WhiteOrDark} from '../../theme';

import {Avatar, Rating} from '../../components';
import {Vote} from '../../modules';

const User = ({
  user,
  rating,
  style,
}: {
  user: any;
  style: any;
  rating?: number;
}) => (
  <Card>
    <Card.Content style={style.cart}>
      <Avatar name={user.name} size={70} image={user.image} />
      <Subheading>{user.name}</Subheading>
      {rating && <Rating value={rating} size={20} />}
    </Card.Content>
  </Card>
);

const Component = ({
  id,
  status,
  performer,
  performerRating,
  customer,
  customerRating,
}: {
  id: string;
  performer?: any;
  performerRating?: any;
  customer: any;
  customerRating?: any;
  status: string;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {user} = useSelector((s: any) => s.user);
  const isCostumer = user.id === customer?.id;
  const isPerformer = user.id === performer?.id;
  const involved = isCostumer || isPerformer;

  return (
    <View>
      <View style={style.user}>
        <User style={style} user={customer} rating={customerRating?.score} />
        {performer && isCostumer && (
          <User
            style={style}
            user={performer}
            rating={performerRating?.score}
          />
        )}
      </View>
      {involved && ['done', 'closed'].includes(status) && (
        <Vote
          id={id}
          size={35}
          score={isCostumer ? customerRating?.score : performerRating?.score}
        />
      )}
    </View>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    user: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    cart: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      margin: 3,
      flex: 1,
    },
  });

export default Component;
