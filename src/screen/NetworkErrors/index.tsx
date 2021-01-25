import React from 'react';
import {ApolloError} from '@apollo/client';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, Button} from 'react-native-paper';

import {collapsed, useTranslation} from '../../translate';

import {getTheme} from '../../theme';

const ERROR = ({
  refetch,
  onResult,
}: {
  refetch: any;
  onResult: (err?: ApolloError, data?: any) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const {tr} = useTranslation();
  return (
    <View style={style.container}>
      <Icon name="disconnect" size={100} color={getTheme.colors.primary} />
      <Title style={style.title}>{tr(collapsed, 'title')}</Title>
      <Caption>{tr(collapsed, 'caption')}</Caption>
      <Button
        onPress={() => {
          setLoading(true);
          refetch({})
            .then((data: any) => {
              setLoading(false);
              onResult(undefined, data);
            })
            .catch((err: any) => {
              if (err.message === 'Access denied') {
                onResult(err, undefined);
              }
              setLoading(false);
            });
        }}
        style={style.btn}
        loading={loading}>
        {loading || tr(collapsed, 'reply')}
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: getTheme.colors.background,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: getTheme.colors.primary,
  },
  btn: {
    margin: 5,
  },
});

export default ERROR;
