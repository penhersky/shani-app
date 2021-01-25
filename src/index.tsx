import React from 'react';
import {get} from 'lodash';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {NetworkError} from './screen';

const Stack = createStackNavigator();

const Main = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Test</Text>
  </View>
);

const App = (): JSX.Element => {
  const [user, setUser] = React.useState();
  const {data, error, loading, refetch} = useQuery(shortAccount, {
    client: authClient,
  });

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
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }
  if (error || !user) {
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
