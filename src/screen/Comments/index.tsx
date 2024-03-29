import React from 'react';
import _ from 'lodash';
import {Button, Text} from 'react-native-paper';

import {comment} from '../../schemas';
import {mainClient} from '../../clients';
import {size, MaterialIcons} from '../../lib/icon';
import {useTheme} from '../../theme';
import {InfinityScroll, Screen, Message} from '../../modules';
import {useTranslation, global, messages} from '../../translate';

import {} from '../../modules';

import {
  ADD_COMMENT_PAGE,
  SET_COMMENTS,
  SET_PAGE,
} from '../../../redux/types/comments';

const MyOrders = ({route}: any) => {
  const theme = useTheme();
  const {tr} = useTranslation();

  return (
    <Screen>
      <InfinityScroll
        schema={comment.getByOrder}
        listName="comments"
        method="getCommentsByOrder"
        client={mainClient}
        Item={Message}
        initialParams={{
          id: _.get(route?.params, 'id'),
          paginate: {page: 1, limit: 20, sort: 'ASC', sortKey: 'createdAt'},
        }}
        ItemSkeleton={<></>}
        storage={{
          page: SET_PAGE,
          set: SET_COMMENTS,
          add: ADD_COMMENT_PAGE,
          key: 'comments',
        }}
        Empty={<Text>Empty</Text>}
      />
    </Screen>
  );
};

export default MyOrders;
