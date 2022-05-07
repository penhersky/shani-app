import React from 'react';
import {ApolloError} from '@apollo/client';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, Button} from 'react-native-paper';

import {collapsed, useTranslation} from '../../translate';

import {getTheme, useTheme} from '../../theme';

const ERROR = ({
  refetch,
  onResult,
}: {
  refetch: any;
  onResult: (err?: ApolloError, data?: any) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const {tr} = useTranslation();
  const theme = useTheme();

  return (
    <View style={[style.container, {backgroundColor: theme.colors.background}]}>
      <Icon name="disconnect" size={100} color={getTheme.colors.primary} />
      <Title style={{color: theme.colors.primary}}>
        {tr(collapsed, 'title')}
      </Title>
      <Caption>{tr(collapsed, 'caption')}</Caption>
      <Button
        onPress={() => {
          setLoading(true);
          refetch({})
            ?.then((data: any) => {
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 5,
  },
});

export default ERROR;
