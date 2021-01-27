import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationTheme} from './theme';
import device from './lib/detectDevice';

import {useDataBase} from './wrappers/db';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {NetworkError, Loading, Landing, Login} from './screen';

import {SET_LNG, languages, Lng} from '../redux/types/settings';

import {saveUser} from './wrappers/authUser';
import {query, tokenSchemas} from './wrappers/db';

const Stack = createStackNavigator();

const Main = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);
const App = (): JSX.Element => {
  const {user, admin} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const db = useDataBase();
  const {data, error, loading, refetch} = useQuery(shortAccount, {
    client: authClient,
  });

  // create tables
  React.useEffect(() => {
    query(db, tokenSchemas.table);
  }, [db]);

  React.useEffect(() => {
    const deviceLng = String(device.getLng()).split('_').join('-');
    dispatch({
      type: SET_LNG,
      lng: languages.includes(deviceLng) ? deviceLng : Lng.en,
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (data) {
      saveUser(data, dispatch, db);
    }
  }, [data, dispatch, db]);

  const reFetchResult = (err: any, info: any) => {
    if (!err) {
      saveUser(info, dispatch, db);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }

  if (error || (!user?.id && !admin?.id)) {
    return (
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
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
