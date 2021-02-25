import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useQuery} from '@apollo/client';

import {useTranslation} from '../../translate';
import {useTheme} from '../../theme';

import useStyle from './style';

const Task = ({
  route: {
    params: {task},
  },
  navigation,
}: any) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  React.useEffect(() => navigation.setOptions({title: task.name}), [
    navigation,
    task.name,
  ]);

  return (
    <View>
      <Text>Task: {task.id}</Text>
      <Text>Task: {task.categories.join(' / ')}</Text>
    </View>
  );
};

export default Task;
