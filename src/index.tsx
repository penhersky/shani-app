import React from 'react';
import {get} from 'lodash';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {authClient} from './clients';
import {shortAccount} from './schemas';

const Stack = createStackNavigator();

const Main = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);

const App = (): JSX.Element => {
  const {data, error, loading} = useQuery(shortAccount, {client: authClient});
  /*
      data.getAccount.result
      data.getAccount.userToken
      data.getAccount.adminToken
      data.getAccount.user.id
    */

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error && error.message !== 'Access denied') {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>{error?.message}</Text>
      </View>
    );
  }
  if (
    error ||
    get(data?.getAccount, 'user') ||
    get(data?.getAccount, 'admin')
  ) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
