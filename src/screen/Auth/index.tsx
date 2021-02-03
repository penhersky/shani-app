import React from 'react';
import {useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import screens from '../../lib/screens';

import {useDataBase} from '../../wrappers/db';
import {navigationTheme} from '../../theme';

import NetworkError from '../NetworkErrors';
import CodeInput from './CodeInput';
import CreatePass from './CreatePass';
import Loading from './Loading';
import Login from './Login';
import SingUp from './SingUp';

import {saveUser} from '../../wrappers/authUser';

const Stack = createStackNavigator();

const Auth = ({navigation, refetch}: any): JSX.Element => {
  const dispatch = useDispatch();
  const db = useDataBase();

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

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name={screens.landing}
          component={Loading}
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
};

export default Auth;
