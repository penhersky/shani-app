import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import screens from '../lib/screens';
import {useTranslation, screenTitle} from '../translate';

import UserPanel from './UserPanel';
import {LeftHeader, HeaderRightUser, LeftHeaderHome} from '../components';

import {navigationTheme} from '../theme';

const Stack = createStackNavigator();

const Home = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);
const Main = (): JSX.Element => {
  const {tr} = useTranslation();
  return (
    <NavigationContainer theme={navigationTheme}>
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
          name={screens.userPanel}
          component={UserPanel}
          options={{
            headerLeft: LeftHeader,
            title: tr(screenTitle, 'account'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
