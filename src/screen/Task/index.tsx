import React from 'react';
import {View, ScrollView} from 'react-native';
import _ from 'lodash';
import {Text, Card, TouchableRipple, Subheading} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTranslation} from '../../translate';
import {useTheme} from '../../theme';
import {task as scheme} from '../../schemas';
import {MaterialIcons, size} from '../../lib/icon';

import {Price, Picker} from '../../components';
import StatusPiker from './status';
import User from './user';

import useStyle from './style';

const Task = ({
  route: {
    params: {task},
  },
  navigation,
}: any) => {
  const theme = useTheme();
  const [state, setState] = React.useState(task);
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const {data, loading, error} = useQuery(scheme.getOrder, {
    variables: {id: task.id},
  });

  React.useEffect(
    () =>
      navigation.setOptions({
        title:
          String(task.name).length > 16
            ? `${String(task.name).slice(0, 16)}...`
            : task.name,
      }),
    [navigation, task.name],
  );

  React.useEffect(() => {
    if (_.get(data, 'getOrder.order')) {
      setState(_.get(data, 'getOrder.order'));
    }
  }, [data]);

  const list = [
    {
      label: 'settings',
      value: '1',
    },
  ];

  return (
    <ScrollView>
      <View style={style.taskHat}>
        <Picker list={list} onChange={() => {}} styles={style.more}>
          <MaterialIcons
            name="more-vert"
            size={size.medium}
            color={theme.colors.text}
          />
        </Picker>
        <Card.Title
          title={task.name}
          subtitle={[...state.categories]
            .map((item) => (typeof item === 'string' ? item : item.name))
            .join(' / ')}
        />
        {state.premium && (
          <MaterialIcons
            name="star"
            style={style.premiumStar}
            size={14}
            color={theme.colors.gold}
          />
        )}
        <Card.Content>
          {_.get(state, 'payment.price') && (
            <Price payment={state.payment} size={30} />
          )}
          <User
            id={state.id}
            status={state.status}
            performer={state.performer}
            performerRating={state.performerRating}
            customer={state.customer}
            customerRating={state.customerRating}
          />
          <StatusPiker
            id={state.id}
            status={state.status}
            performer={state.performer}
            customer={state.customer}
          />
          <Text>{_.get(state, 'description')}</Text>
        </Card.Content>
      </View>
      <Card>
        <Card.Content style={style.actions}>
          <TouchableRipple style={style.action} onPress={() => {}}>
            <>
              <AntDesign name="user" size={size.medium} style={style.margin} />
              <Subheading>{state.requests}</Subheading>
            </>
          </TouchableRipple>
          <TouchableRipple style={style.action} onPress={() => {}}>
            <>
              <MaterialIcons
                name="comment"
                size={size.medium}
                style={style.margin}
              />
              <Subheading>{state.comments}</Subheading>
            </>
          </TouchableRipple>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default Task;
