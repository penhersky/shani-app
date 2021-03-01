import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import {WhiteOrDark, useTheme} from '../../theme';

const Task = () => {
  const theme = useTheme();
  const style = useStyle(theme);

  return (
    <Card style={style.task}>
      <Skeleton
        backgroundColor={theme.colors.background}
        highlightColor={theme.colors.accent}>
        <View>
          <Skeleton.Item height={30} width={200} margin={7} />
          <Skeleton.Item height={20} width={170} marginHorizontal={7} />

          <View style={style.user}>
            <Skeleton.Item
              height={30}
              width={30}
              margin={7}
              borderRadius={15}
            />
            <Skeleton.Item height={30} width={200} />
          </View>
          <Skeleton.Item height={26} width={100} margin={7} />
          <Skeleton.Item height={16} width={100} margin={7} />
          <View style={style.footer}>
            <Skeleton.Item height={30} width={40} />
            <Skeleton.Item height={30} width={40} />
            <Skeleton.Item height={30} width={60} />
          </View>
        </View>
      </Skeleton>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    task: {
      margin: 3,
      borderRadius: theme.borderRadius * 3,
      padding: 10,
    },
    user: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 3,
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 3,
      marginHorizontal: 5,
    },
  });

export default Task;
