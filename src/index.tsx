import React from 'react';
import {get} from 'lodash';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {getTheme} from './theme';

import {authClient} from './clients';
import {shortAccount} from './schemas';

import {NetworkError, Loading} from './screen';

const Stack = createStackNavigator();

const theme = {
  dark: false,
  colors: {
    primary: getTheme.colors.primary,
    background: getTheme.colors.background,
    card: getTheme.colors.surface,
    text: getTheme.colors.text,
    border: getTheme.colors.backdrop,
    notification: 'rgb(255, 69, 58)',
  },
};

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
    return <Loading />;
  }

  if (error && error.message !== 'Access denied') {
    return <NetworkError refetch={refetch} onResult={reFetchResult} />;
  }

  if (error || !user) {
    return (
      <NavigationContainer theme={theme}>
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
