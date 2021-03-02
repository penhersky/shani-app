import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useQuery} from '@apollo/client';

import {useTranslation} from '../../translate';
import {useTheme} from '../../theme';
import {task as scheme} from '../../schemas';

import {Screen} from '../../modules';
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

  const {data, loading, error} = useQuery(scheme.getOrder, {
    variables: {id: task.id},
  });

  React.useEffect(() => navigation.setOptions({title: task.name}), [
    navigation,
    task.name,
  ]);

  console.log(data, error);

  return (
    <Screen>
      <Card>
        <Card.Title
          title={task.name}
          subtitle={_.get(data, 'getOrder.description')}
        />
      </Card>
    </Screen>
  );
};

export default Task;
