import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useTranslation, user as text} from '../../translate';

import {fullAccount} from '../../schemas';

import {MessageInfo, NetworkError} from '../../modules';
import {authClient} from '../../clients';

import {useTheme} from '../../theme';

import Header from './Header';
import Hat from './Hat';
import Rating from './rating';
import Contacts from './Contacts';
import Description from './Description';

const Panel = ({route}: any): JSX.Element => {
  const theme = useTheme();
  const userId = _.get(route?.params, 'userId');
  const [status, setStatus] = React.useState();
  const {tr} = useTranslation();
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

  const setContactsHandler = (cb: (any: []) => any[]) => {
    setAccount((state: any) => ({
      ...state,
      contacts: cb(state.contacts),
    }));
  };

  if (!userId) {
    return (
      <MessageInfo
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
      <MessageInfo
        Icon={
          <Icon name="user-alt-slash" size={50} color={theme.colors.primary} />
        }
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

      <Rating owner={user.id === account?.id} id={userId} />

      <Contacts
        allowed={allowed && !loading}
        contacts={account?.contacts}
        setContacts={setContactsHandler}
      />

      <Description
        allowed={allowed && !loading}
        loaded={!loading}
        description={account?.description}
        newDescription={descriptionHandler}
      />
    </ScrollView>
  );
};

export default Panel;
