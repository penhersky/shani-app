import React from 'react';
import {useSelector} from 'react-redux';
import {Button, Text} from 'react-native-paper';

import {comment} from '../../schemas';
import {mainClient} from '../../clients';
import {size, MaterialIcons} from '../../lib/icon';
import {useTheme} from '../../theme';
import {InfinityScroll, Screen, Comment} from '../../modules';
import {useTranslation, global, messages} from '../../translate';

import {} from '../../modules';

import {
  ADD_COMMENT_PAGE,
  SET_COMMENTS,
  SET_PAGE,
} from '../../../redux/types/comments';

const MyOrders = ({navigation}: any) => {
  const theme = useTheme();
  const {tr} = useTranslation();
  const {user} = useSelector((state: any) => state.user);

  return (
    <Screen>
      <InfinityScroll
        schema={comment.getByOrder}
        listName="comments"
        method="getCommentsByOrder"
        client={mainClient}
        Item={Comment}
        initialParams={{
          pagination: {page: 1, limit: 20, sort: 'ASC', sortKey: 'createdAt'},
        }}
        ItemSkeleton={<></>}
        storage={{
          page: SET_PAGE,
          set: SET_COMMENTS,
          add: ADD_COMMENT_PAGE,
          key: 'task',
        }}
        Empty={<Text>Empty</Text>}
      />
    </Screen>
  );
};

export default MyOrders;
