import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';

import {mainClient} from './src/clients';

import {useTheme} from './src/theme';
import store from './redux/store';
import App from './src';

const Root = () => {
  const theme = useTheme();
  return (
    <>
      <ApolloProvider client={mainClient}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default Root;
