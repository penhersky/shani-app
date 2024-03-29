import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@apollo/client';

import device from './lib/detectDevice';

import {useDataBase} from './wrappers/db';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {NetworkError, Loading, Auth, Main} from './screen';

import {SET_LNG, SET_THEME, languages, Lng} from '../redux/types/settings';
import {SET_AUTH} from '../redux/types/user';

import {saveUser} from './wrappers/authUser';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const {isAuthorized} = useSelector((state: any) => state.user);
  const db = useDataBase();
  const {data, error, loading, refetch} = useQuery(shortAccount, {
    client: authClient,
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    if (data) {
      saveUser(data, dispatch, db);
      dispatch({type: SET_AUTH, isAuthorized: true});
    }
  }, [data, dispatch, db]);

  React.useEffect(() => {
    const deviceLng = String(device.getLng()).split('_').join('-');
    dispatch({
      type: SET_LNG,
      lng: languages.includes(deviceLng) ? deviceLng : Lng.en,
    });
    dispatch({
      type: SET_THEME,
      theme: device.theme(),
    });
  }, [dispatch]);

  const reFetchResult = (err: any, info: any) => {
    if (!err) {
      saveUser(info, dispatch, db);
      dispatch({type: SET_AUTH, isAuthorized: true});
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }

  if (error || data?.getAccount?.result !== 'SUCCESS' || !isAuthorized) {
    return <Auth refetch={refetch} />;
  }

  return <Main />;
};

export default App;
