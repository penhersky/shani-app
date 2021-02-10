import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useTranslation, user as text} from '../../translate';

import {fullAccount} from '../../schemas';

import useStyle from './style';

import {useTheme} from '../../theme';

import {Message, NetworkError} from '../../modules';
import {authClient} from '../../clients';

import Header from './Header';
import Hat from './Hat';
import Description from './Description';

const Panel = ({route}: any): JSX.Element => {
  const userId = _.get(route?.params, 'userId');
  const [status, setStatus] = React.useState();
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, type} = useSelector((state: any) => state.user);

  const {data, error, loading, refetch} = useQuery(fullAccount, {
    client: authClient,
    variables: {id: userId},
    fetchPolicy: 'cache-and-network',
  });

  const [account, setAccount] = React.useState<any>(
    _.get(data, 'getUser')?.user,
  );

  const allowed = user.id === account?.id || type === 'admin';

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

  // update
  const descriptionHandler = (value: string) => {
    setAccount({
      ...account,
      description: value,
    });
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
      <Hat
        loading={loading}
        header={<Header />}
        name={String(account?.name)}
        images={account?.images}
      />

      <Description
        allowed={allowed}
        loaded={!loading}
        description={account?.description}
        newDescription={descriptionHandler}
      />
    </ScrollView>
  );
};

export default Panel;
