import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {mainApiUrl} from './src/config';

import {useTheme} from './src/theme';
import store from './redux/store';
import App from './src';

const client = new ApolloClient({
  uri: mainApiUrl,
  cache: new InMemoryCache(),
});

const Root = () => {
  const theme = useTheme();
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <SafeAreaView>
              <App />
            </SafeAreaView>
          </PaperProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default Root;
