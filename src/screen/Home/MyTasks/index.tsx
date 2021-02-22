import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {task} from '../../../schemas';
import {mainClient} from '../../../clients';

import {InfinityScroll} from '../../../modules';

const MyOrders = () => {
  return (
    <View>
      <InfinityScroll
        schema={task.getMy}
        listName="orders"
        method="getMyOrders"
        client={mainClient}
        Item={Text}
        ItemSkeleton={Text}
      />
    </View>
  );
};

export default MyOrders;
