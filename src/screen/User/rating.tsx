import React from 'react';
import {get, map, find} from 'lodash';
import {useQuery} from '@apollo/client';
import {StyleSheet, View, Text as Title, Dimensions} from 'react-native';
import {Card, Text, ProgressBar, Caption} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import {useTheme, WhiteOrDark} from '../../theme';

import {Rating} from '../../components';

import {rating} from '../../schemas';

const Info = ({owner, id}: {owner: any; id?: string}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {data, loading} = useQuery(owner ? rating.getMy : rating.getUser, {
    variables: {id: owner ? undefined : id},
    fetchPolicy: 'cache-and-network',
  });

  const average = get(data, owner ? 'getMyAverage' : 'getUserAverage');

  return (
    <Card>
      <Card.Content style={style.container}>
        {loading && !average ? (
          <>
            <Skeleton
              backgroundColor={theme.colors.background}
              highlightColor={theme.colors.accent}>
              <Skeleton.Item
                display="flex"
                flexDirection="row"
                flexWrap="nowrap">
                <Skeleton.Item width={90} height={90} marginHorizontal={10} />
                <Skeleton.Item
                  width={Dimensions.get('window').width - 150}
                  height={90}
                />
              </Skeleton.Item>
            </Skeleton>
          </>
        ) : (
          <>
            <View style={style.rating}>
              <Text>{get(average, 'count')}</Text>
              <Title style={style.score}>
                {Number(get(average, 'score') ?? 0).toFixed(1)}
              </Title>
              <Rating
                value={get(average, 'score')}
                size={16}
                color={theme.colors.primary}
              />
            </View>
            <View style={style.progressBlock}>
              {map(Array(5), (_v, i: number) => (
                <View style={style.count} key={i}>
                  <Caption style={style.countText}>{i + 1}</Caption>
                  <ProgressBar
                    progress={
                      average?.count === 0
                        ? 0
                        : Number(find(average.group, {score: i + 1})?.count) /
                          Number(average?.count)
                    }
                    color={theme.colors.primary}
                    style={style.progress}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rating: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: 100,
    },
    score: {
      fontSize: 40,
    },
    progressBlock: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    count: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 7,
    },
    countText: {
      marginHorizontal: 10,
    },
    progress: {
      width: Dimensions.get('window').width - 170,
      height: 7,
      backgroundColor: theme.colors.background,
    },
  });

export default Info;
