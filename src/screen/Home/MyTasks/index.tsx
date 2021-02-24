import React from 'react';
import {View} from 'react-native';

import {task} from '../../../schemas';
import {mainClient} from '../../../clients';

import {InfinityScroll, Task, TaskSkeleton} from '../../../modules';

const MyOrders = () => {
  return (
    <View>
      <InfinityScroll
        schema={task.getMy}
        listName="orders"
        method="getMyOrders"
        client={mainClient}
        Item={Task}
        ItemSkeleton={<TaskSkeleton />}
      />
    </View>
  );
};

export default MyOrders;
