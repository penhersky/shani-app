import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import {Text, Title, Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {avatarText} from '../../lib/format';
import {useTranslation, user as text} from '../../translate';
import screens from '../../lib/screens';

import {fullAccount} from '../../schemas';

import useStyle from './style';

import {useTheme} from '../../theme';

import {Message, NetworkError} from '../../modules';
import {authClient} from '../../clients';

export {default as HeaderRight} from './rightHeader';

const Panel = ({route}: any): JSX.Element => {
  const userId = _.get(route?.params, 'userId');
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, admin, type} = useSelector((state: any) => state.user);

  const {data, error, loading, refetch} = useQuery(fullAccount, {
    client: authClient,
    variables: {id: userId},
  });

  const [account, setAccount] = React.useState();
  const [status, setStatus] = React.useState();

  React.useEffect(() => {
    if (data) {
      setStatus(_.get(data, 'getUser').status);
      if (_.get(data, 'getUser').result === 'SUCCESS') {
        setAccount(_.get(data, 'getUser').user);
      }
    }
  }, [data]);

  const refetchResult = (err?: any | undefined, res?: any) => {
    if (!err) {
      if (res) {
        setStatus(_.get(res, 'getUser').status);
        if (_.get(res, 'getUser').result === 'SUCCESS') {
          setAccount(_.get(res, 'getUser').user);
        }
      }
    }
  };

  if (!userId) {
    return (
      <Message
        title={tr(text, 'error').notFond}
        body={tr(text, 'error').notFondBody}
      />
    );
  }

  if (error) {
    return <NetworkError onResult={refetchResult} refetch={refetch} />;
  }

  if (status === 44) {
    return (
      <Message
        Icon={Icon}
        name="user-alt-slash"
        title={tr(text, 'error').notFond}
        body={tr(text, 'error').userDeleted}
      />
    );
  }

  return (
    <ScrollView>
      {/* <View>
        <View>
          {uri ? (
            <Avatar.Image size={120} source={{uri}} />
          ) : (
            <Avatar.Text size={120} label={avatarText(account.name)} />
          )}

          <Title>{account.name}</Title>
          <Text>{account.email}</Text>
        </View>
      </View>
      <Divider /> */}
      <Text>User</Text>
    </ScrollView>
  );
};

export default Panel;
