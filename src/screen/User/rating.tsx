import React from 'react';
import {get} from 'lodash';
import {useQuery} from '@apollo/client';
import {StyleSheet, View, Text as Title} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import {useTheme, WhiteOrDark} from '../../theme';

import {Rating} from '../../components';

import {rating} from '../../schemas';

const Info = ({owner, id}: {owner: any; id?: string}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {data, loading, error} = useQuery(
    owner ? rating.getMy : rating.getUser,
    {
      variables: {id: owner ? undefined : id},
    },
  );

  const average = get(data, owner ? 'getMyAverage' : 'getUserAverage');

  return (
    <Card>
      <Card.Content style={style.container}>
        <View />
        <View style={style.rating}>
          <Text>{get(average, 'count')}</Text>
          <Title style={style.score}>
            {Number(get(average, 'score')).toFixed(1)}
          </Title>
          <Rating
            value={get(average, 'score')}
            size={16}
            color={theme.colors.primary}
          />
        </View>
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
  });

export default Info;
