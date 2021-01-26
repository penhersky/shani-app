import React from 'react';
import {useDispatch} from 'react-redux';
import {get} from 'lodash';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationTheme} from './theme';
import device from './lib/detectDevice';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {NetworkError, Loading} from './screen';

import {SET_LNG, languages, Lng} from '../redux/types/settings';

const Stack = createStackNavigator();

const Main = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);

const App = (): JSX.Element => {
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();
  const {data, error, loading, refetch} = useQuery(shortAccount, {
    client: authClient,
  });

  React.useEffect(() => {
    const deviceLng = String(device.getLng()).split('_').join('-');
    dispatch({
      type: SET_LNG,
      lng: languages.includes(deviceLng) ? deviceLng : Lng.en,
    });
  }, [dispatch]);
  /*
      data.getAccount.result
      data.getAccount.userToken
      data.getAccount.adminToken
      data.getAccount.user.id
    */

  React.useEffect(() => {
    if (data) {
      setUser(get(data?.getAccount, 'user') || get(data?.getAccount, 'admin'));
    }
  }, [data]);

  const reFetchResult = (err: any, info: any) => {
    if (!err) {
      setUser(get(info?.getAccount, 'user') || get(info?.getAccount, 'admin'));
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }

  if (error || !user) {
    return (
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
