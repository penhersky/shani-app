import React from 'react';
import _ from 'lodash';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useQuery, TypedDocumentNode, DocumentNode} from '@apollo/client';

import {NetworkError} from '../';

const Scroll = ({
  schema,
  initialParams = {},
  Item,
  ItemSkeleton,
  method,
  listName,
  client,
}: {
  schema: DocumentNode | TypedDocumentNode<any, any>;
  initialParams?: any;
  Item: any;
  ItemSkeleton: any;
  method: string;
  listName: string;
  client?: any;
}) => {
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(1);
  const [loaded, setLoaded] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [list, setList] = React.useState<any[]>([]);
  const scroll = React.createRef<any>();

  const {data, fetchMore, loading, error, refetch} = useQuery(schema, {
    variables: {...initialParams},
    client,
  });

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    if (total <= page) {
      return;
    }

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch({})?.then((res) => {
      setRefreshing(res.loading);
      if (_.get(res, method)) {
        scroll.current.scrollTo(0);
        setTotal(_.get(data, method)?.totalPages);
        setList(_.get(res, `${method}.${listName}`));
        setPage(_.get(data, method)?.page);
      }
    });
  };

  const refetchResult = (err?: any | undefined, res?: any) => {
    if (!err) {
      if (_.get(res, method)) {
        setTotal(_.get(data, method)?.totalPages);
        setList(_.get(res, `${method}.${listName}`));
        setPage(_.get(data, method)?.page);
      }
    }
  };

  React.useEffect(() => {
    if (page > 1) {
      setLoaded(false);
      fetchMore({variables: {page}})?.then((res) => {
        setLoaded(!res.loading);
        if (_.get(res, method)) {
          setTotal(_.get(res, method)?.totalPages);
          setList((prev: any) => [
            ...prev,
            ..._.get(res, `${method}.${listName}`),
          ]);
        }
      });
    }
  }, [page, listName, method, fetchMore]);

  React.useEffect(() => {
    if (_.get(data, method)) {
      setTotal(_.get(data, method)?.totalPages);
      setList(_.get(data, `${method}.${listName}`));
    }
  }, [data, listName, method]);

  if (error) {
    return <NetworkError onResult={refetchResult} refetch={refetch} />;
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
