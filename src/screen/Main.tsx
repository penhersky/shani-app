import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import screens from '../lib/screens';
import {useTranslation, screenTitle} from '../translate';

import UserPanel from './UserPanel';
import Settings from './Settings';
import User from './User';
import Home from './Home';
import {LeftHeader, HeaderRightUser, LeftHeaderHome} from '../components';

import {navigationTheme, useTheme} from '../theme';

const Stack = createStackNavigator();

const Main = (): JSX.Element => {
  const theme = useTheme();
  const {tr} = useTranslation();
  return (
    <NavigationContainer theme={navigationTheme(theme) as any}>
      <Stack.Navigator initialRouteName={screens.home}>
        <Stack.Screen
          name={screens.home}
          component={Home}
          options={{
            headerRight: HeaderRightUser,
            headerLeft: LeftHeaderHome,
            title: '',
          }}
        />
        <Stack.Screen
          name={screens.userProfile}
          component={User}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screens.userPanel}
          component={UserPanel}
          options={{
            headerLeft: LeftHeader,
            title: tr(screenTitle, 'account'),
          }}
        />
        <Stack.Screen
          name={screens.settings}
          component={Settings}
          options={{
            headerLeft: LeftHeader,
            headerRight: HeaderRightUser,
            title: tr(screenTitle, 'settings'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
