import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationTheme} from './theme';
import device from './lib/detectDevice';
import screens from './lib/screens';

import {useDataBase} from './wrappers/db';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {
  NetworkError,
  Loading,
  Landing,
  Login,
  SingUp,
  CodeInput,
  CreatePass,
} from './screen';
import {HeaderRightUser, LeftHeaderHome} from './components';

import {SET_LNG, SET_THEME, languages, Lng} from '../redux/types/settings';

import {saveUser} from './wrappers/authUser';

const Stack = createStackNavigator();

const Main = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);
const App = ({navigation}: any): JSX.Element => {
  const dispatch = useDispatch();
  const db = useDataBase();
  const {data, error, loading, refetch} = useQuery(shortAccount, {
    client: authClient,
    fetchPolicy: 'no-cache',
  });

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
  console.log(1);
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
  const authorized = () => {
    refetch()
      ?.then((info: any) => {
        saveUser(info, dispatch, db);
      })
      .catch((err: any) => {
        if (err.message !== 'Access denied') {
          navigation.navigate(screens.networkError);
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }
  if (error || data?.getAccount?.result !== 'SUCCESS') {
    return (
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name={screens.landing}
            component={Landing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screens.landing}
            component={Login}
            options={{headerShown: false}}
            initialParams={{authorized}}
          />
          <Stack.Screen
            name={screens.singUp}
            component={SingUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screens.codeInput}
            component={CodeInput}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screens.createPass}
            component={CreatePass}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screens.networkError}
            component={NetworkError}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName={screens.home}>
        <Stack.Screen
          name={screens.home}
          component={Main}
          options={{
            headerRight: HeaderRightUser,
            headerLeft: LeftHeaderHome,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
