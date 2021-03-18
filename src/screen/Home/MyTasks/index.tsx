import React from 'react';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';

import {task} from '../../../schemas';
import {mainClient} from '../../../clients';
import {size, MaterialIcons} from '../../../lib/icon';
import {useTheme} from '../../../theme';
import screens from '../../../lib/screens';
import {useTranslation, global, messages} from '../../../translate';

import {
  InfinityScroll,
  Task,
  TaskSkeleton,
  Screen,
  Message,
} from '../../../modules';

import {
  ADD_TASKS_PAGE,
  SET_PAGE,
  SET_TASKS,
} from '../../../../redux/types/task';

const MyOrders = ({navigation}: any) => {
  const theme = useTheme();
  const {tr} = useTranslation();
  const {type} = useSelector((state: any) => state.user);

  return (
    <Screen>
      <InfinityScroll
        schema={task.getMy}
        listName="orders"
        method="getMyOrders"
        client={mainClient}
        Item={Task}
        initialParams={{
          pagination: {page: 1, limit: 10, sort: 'DESC', sortKey: 'createdAt'},
        }}
        ItemSkeleton={<TaskSkeleton />}
        storage={{
          page: SET_PAGE,
          set: SET_TASKS,
          add: ADD_TASKS_PAGE,
          key: 'task',
        }}
        Empty={
          <Message
            title={tr(messages, 'noneMyOrder')}
            Icon={
              <MaterialIcons
                name="calendar-today"
                size={size.large * 2}
                color={theme.colors.primary}
              />
            }>
            <Button
              onPress={() => {
                navigation.navigate(
                  type === 'customer'
                    ? screens.TABS.add
                    : screens.TABS.recommendation,
                );
              }}>
              {tr(global, type === 'customer' ? 'create' : 'find')}
            </Button>
          </Message>
        }
      />
    </Screen>
  );
};

export default MyOrders;
