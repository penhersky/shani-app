import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import screens from '../lib/screens';

import UserPanel from './UserPanel';
import {HeaderRightUser, LeftHeaderHome} from '../components';

const Stack = createStackNavigator();

const Home = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);
const Main = (): JSX.Element => {
  return (
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
          headerRight: HeaderRightUser,
          headerLeft: LeftHeaderHome,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
