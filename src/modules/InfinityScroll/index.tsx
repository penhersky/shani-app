import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useQuery, TypedDocumentNode, DocumentNode} from '@apollo/client';

import NetworkError from '../Message/NetworkError';

const Scroll = ({
  schema,
  initialParams = {},
  Item,
  ItemSkeleton,
  method,
  listName,
  client,
  storage,
  Empty,
}: {
  schema: DocumentNode | TypedDocumentNode<any, any>;
  initialParams?: any;
  Item: any;
  ItemSkeleton: any;
  method: string;
  listName: string;
  client?: any;
  Empty: any;
  storage: {
    key: string;
    set: string;
    page: string;
    add: string;
  };
}) => {
  const dispatch = useDispatch();
  const {list, page, total} = useSelector((state: any) =>
    _.get(state, storage.key),
  );

  const [loaded, setLoaded] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const scroll = React.createRef<any>();

  const {data, fetchMore, loading, error, refetch} = useQuery(schema, {
    variables: {...initialParams},
    client,
    fetchPolicy: 'cache-first',
  });

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    if (total <= page) {
      return;
    }

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      dispatch({type: storage.page, page: page + 1});
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch({})?.then((res) => {
      setRefreshing(res.loading);
      if (_.get(res, 'data')) {
        dispatch({
          type: storage.set,
          page: _.get(res, `data.${method}`)?.page,
          list: _.get(res, `data.${method}.${listName}`),
          total: _.get(res, `data.${method}`)?.totalPages,
        });
      }
    });
  };

  const refetchResult = (err?: any | undefined, res?: any) => {
    if (!err) {
      if (_.get(res, 'data')) {
        dispatch({
          type: storage.set,
          page: _.get(res, `data.${method}`)?.page,
          list: _.get(res, `data.${method}.${listName}`),
          total: _.get(res, `data.${method}`)?.totalPages,
        });
      }
    }
  };

  React.useEffect(() => {
    if (page > 1) {
      setLoaded(false);
      fetchMore({variables: {page}})?.then((res) => {
        setLoaded(!res.loading);
        if (_.get(res, 'data')) {
          dispatch({
            type: storage.add,
            total: _.get(res, `data.${method}`)?.totalPages,
            list: _.get(res, `data.${method}.${listName}`),
          });
        }
      });
    }
  }, [page, listName, method, fetchMore, dispatch, storage.add]);

  React.useEffect(() => {
    if (_.get(data, method)) {
      dispatch({
        type: storage.set,
        page: _.get(data, method)?.page,
        list: _.get(data, `${method}.${listName}`),
        total: _.get(data, method)?.totalPages,
      });
    }
  }, [data, listName, method, dispatch, storage.set]);

  if (error) {
    return <NetworkError onResult={refetchResult} refetch={refetch} />;
  }

  if (!total && !loading) {
    return Empty;
  }

  return (
    <View>
      <ScrollView
        onScroll={handleScroll}
        ref={scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {_.map(loading ? Array.from(new Array(5)) : list, (item, i) =>
          item ? (
            <Item key={item?.id + i} value={item} />
          ) : (
            <View key={i}>{ItemSkeleton}</View>
          ),
        )}
      </ScrollView>
      <ActivityIndicator style={style.spinner} animating={!loaded} size={40} />
    </View>
  );
};

const style = StyleSheet.create({
  item: {
    height: 300,
    backgroundColor: '#F0EAD6FF',
    margin: 5,
  },
  spinner: {
    margin: 10,
  },
});

export default Scroll;
