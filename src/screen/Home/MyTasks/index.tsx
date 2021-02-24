import React from 'react';

import {task} from '../../../schemas';
import {mainClient} from '../../../clients';

import {InfinityScroll, Task, TaskSkeleton, Screen} from '../../../modules';

const MyOrders = () => {
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
      />
    </Screen>
  );
};

export default MyOrders;
