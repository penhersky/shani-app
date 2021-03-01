import React from 'react';

import {task} from '../../../schemas';
import {mainClient} from '../../../clients';

import {InfinityScroll, Task, TaskSkeleton, Screen} from '../../../modules';

const MyOrders = ({route: {params}}: any) => {
  return (
    <Screen>
      <InfinityScroll
        schema={task.getMy}
        listName="orders"
        method="getMyOrders"
        client={mainClient}
        newItem={params?.task}
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
