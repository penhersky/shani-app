import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ApolloError} from '@apollo/client';
import {Button} from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTranslation, collapsed} from '../../translate';

import Message from '.';
import {useTheme} from '../../theme';

const Error = ({
  refetch,
  onResult,
}: {
  refetch: any;
  onResult: (err?: ApolloError, data?: any) => void;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const {tr} = useTranslation();

  const onPressHandler = () => {
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
  };

  return (
    <Message
      title={tr(collapsed, 'title')}
      body={tr(collapsed, 'caption')}
      Icon={
        <AntDesign name="disconnect" size={50} color={theme.colors.primary} />
      }>
      <View>
        <Button onPress={onPressHandler} style={style.btn} loading={loading}>
          {loading || tr(collapsed, 'reply')}
        </Button>
      </View>
    </Message>
  );
};

const style = StyleSheet.create({
  btn: {
    margin: 5,
  },
});

export default Error;
