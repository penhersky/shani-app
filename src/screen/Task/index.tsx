import React from 'react';
import _ from 'lodash';
import {} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [state, setState] = React.useState(task);
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const {data, loading, error} = useQuery(scheme.getOrder, {
    variables: {id: task.id},
  });

  React.useEffect(
    () =>
      navigation.setOptions({
        title:
          String(task.name).length > 16
            ? `${String(task.name).slice(0, 16)}...`
            : task.name,
      }),
    [navigation, task.name],
  );

  React.useEffect(() => {
    if (_.get(data, 'getOrder.order')) {
      setState(_.get(data, 'getOrder.order'));
    }
  }, [data]);

  return (
    <Screen>
      <Card style={style.taskHat}>
        <Card.Title
          title={task.name}
          subtitle={[...state.categories]
            .map((item) => (typeof item === 'string' ? item : item.name))
            .join(' / ')}
        />
        {state.premium && (
          <Icon
            name="star"
            style={style.premiumStar}
            size={14}
            color={theme.colors.gold}
          />
        )}
        <Card.Content>
          <Text>{_.get(state, 'description')}</Text>
        </Card.Content>
      </Card>
    </Screen>
  );
};

export default Task;
