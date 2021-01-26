import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';
import SQLite from 'react-native-sqlite-storage';

import {mainClient} from './src/clients';

import {databaseName} from './src/config';

import {DBProvider} from './src/wrappers/db';

import {useTheme} from './src/theme';
import store from './redux/store';
import App from './src';

const db = SQLite.openDatabase(
  {
    name: databaseName,
    location: 'default',
  },
  () => {},
  () => {
    throw new Error('Database is not connected');
  },
);

const Root = () => {
  const theme = useTheme();
  return (
    <>
      <DBProvider database={db}>
        <ApolloProvider client={mainClient}>
          <Provider store={store}>
            <PaperProvider theme={theme}>
              <App />
            </PaperProvider>
          </Provider>
        </ApolloProvider>
      </DBProvider>
    </>
  );
};

export default Root;
